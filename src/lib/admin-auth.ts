// Shared staff-passcode storage and verification.
//
// Used by three places that all need to agree on the same passcode:
// /api/panel/login (the panel's sign-in form), /api/panel/change-password
// (lets staff change it), and /api/settings (the write-gate for every
// setting the panel saves). Keeping this in one file means changing the
// passcode from the panel actually changes what all three accept.
//
// Storage: a single hashed passcode in the `admin_auth` table (scrypt,
// salted - no extra dependency needed, Node's crypto module already does
// this). Until a passcode has ever been set (fresh DB, or DB not
// configured at all), this falls back to the comma-separated
// ADMIN_PASSCODES env var (same as before), so a brand-new deploy keeps
// working with zero setup.
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { eq } from "drizzle-orm";
import { getDb, isDbConfigured } from "@/lib/db";
import { adminAuth } from "@/lib/schema";

const ROW_ID = 1;

function hashPasscode(passcode: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(passcode, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

function matchesHash(passcode: string, stored: string): boolean {
  const [salt, derivedHex] = stored.split(":");
  if (!salt || !derivedHex) return false;
  const candidate = scryptSync(passcode, salt, 64);
  const expected = Buffer.from(derivedHex, "hex");
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

// Only consulted when no passcode has ever been saved to the DB yet (or
// the DB isn't configured at all) - the original zero-config defaults.
function getFallbackPasscodes(): string[] {
  const raw = process.env.ADMIN_PASSCODES;
  if (!raw) return ["admin123", "nexcore2026"];
  return raw.split(",").map((p) => p.trim().toLowerCase()).filter(Boolean);
}

export async function verifyPasscode(passcode: string): Promise<boolean> {
  const normalized = passcode.trim().toLowerCase();
  if (!normalized) return false;

  if (isDbConfigured()) {
    try {
      const db = getDb()!;
      const rows = await db.select().from(adminAuth).where(eq(adminAuth.id, ROW_ID)).limit(1);
      if (rows.length > 0) {
        return matchesHash(normalized, rows[0].passcodeHash);
      }
    } catch {
      // DB unreachable - fall through to the env-var fallback below rather
      // than locking everyone out over a transient connection issue.
    }
  }

  return getFallbackPasscodes().includes(normalized);
}

export async function setPasscode(newPasscode: string): Promise<boolean> {
  if (!isDbConfigured()) return false;

  try {
    const db = getDb()!;
    const hash = hashPasscode(newPasscode.trim().toLowerCase());
    await db
      .insert(adminAuth)
      .values({ id: ROW_ID, passcodeHash: hash })
      .onConflictDoUpdate({ target: adminAuth.id, set: { passcodeHash: hash, updatedAt: new Date() } });
    return true;
  } catch {
    return false;
  }
}
