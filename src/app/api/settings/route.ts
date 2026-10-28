import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb, isDbConfigured } from "@/lib/db";
import { siteSettings } from "@/lib/schema";
import { DEFAULT_SETTINGS, mergeWithDefaults, type SiteSettings } from "@/lib/site-settings-defaults";

const ROW_ID = 1;

// Mirrors the throttle pattern in src/app/api/tebex/checkout/route.ts - a
// speed bump against casual abuse of the write endpoint, not a real
// distributed rate limiter. Resets on server restart, per-instance only.
const hits = new Map<string, number[]>();
function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 20;
}

// Passcodes that are allowed to write settings. Defaults to the same two
// demo passcodes the panel's login screen already uses, so this keeps
// working with zero config - set ADMIN_PASSCODES (comma-separated) to
// change them without touching code.
function getValidPasscodes(): string[] {
  const raw = process.env.ADMIN_PASSCODES;
  if (!raw) return ["admin123", "nexcore2026"];
  return raw.split(",").map((p) => p.trim().toLowerCase()).filter(Boolean);
}

// GET is public - every visitor's browser calls this to know whether
// maintenance mode / the banner / displayed server info are active.
// There's nothing secret in here (it's all meant to be shown on the site).
export async function GET() {
  if (!isDbConfigured()) {
    return NextResponse.json({ settings: DEFAULT_SETTINGS, persisted: false });
  }

  try {
    const db = getDb()!;
    const rows = await db.select().from(siteSettings).where(eq(siteSettings.id, ROW_ID)).limit(1);

    if (rows.length === 0) {
      // First ever request after the DB was wired up - seed the row.
      await db.insert(siteSettings).values({ id: ROW_ID, data: DEFAULT_SETTINGS });
      return NextResponse.json({ settings: DEFAULT_SETTINGS, persisted: true });
    }

    return NextResponse.json({ settings: mergeWithDefaults(rows[0].data), persisted: true });
  } catch {
    // DB unreachable for whatever reason - never take the whole site down
    // over a settings fetch, just serve defaults.
    return NextResponse.json({ settings: DEFAULT_SETTINGS, persisted: false });
  }
}

// POST is staff-only (passcode-gated) - this is what actually makes a
// maintenance-mode toggle apply to every visitor, not just the admin's
// own browser.
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooManyRequests(ip)) {
    return NextResponse.json({ error: "Too many attempts — wait a minute and try again." }, { status: 429 });
  }

  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "Live settings storage isn't configured yet — this change only applies in your browser." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { passcode, settings } = (body ?? {}) as { passcode?: string; settings?: Partial<SiteSettings> };

  if (typeof passcode !== "string" || !getValidPasscodes().includes(passcode.toLowerCase())) {
    return NextResponse.json({ error: "Invalid staff passcode." }, { status: 401 });
  }
  if (typeof settings !== "object" || settings === null) {
    return NextResponse.json({ error: "No settings provided." }, { status: 400 });
  }

  try {
    const db = getDb()!;
    const merged = mergeWithDefaults(settings);

    await db
      .insert(siteSettings)
      .values({ id: ROW_ID, data: merged })
      .onConflictDoUpdate({ target: siteSettings.id, set: { data: merged, updatedAt: new Date() } });

    return NextResponse.json({ settings: merged });
  } catch {
    return NextResponse.json({ error: "Couldn't save settings — try again in a moment." }, { status: 502 });
  }
}
