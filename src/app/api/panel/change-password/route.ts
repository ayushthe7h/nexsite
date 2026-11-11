import { NextRequest, NextResponse } from "next/server";
import { isDbConfigured } from "@/lib/db";
import { verifyPasscode, setPasscode } from "@/lib/admin-auth";

// Tighter throttle than login/settings - there's no legitimate reason to
// call this endpoint often, and it's the one that can lock staff out if
// abused.
const hits = new Map<string, number[]>();
function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 6;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooManyRequests(ip)) {
    return NextResponse.json({ error: "Too many attempts — wait a minute and try again." }, { status: 429 });
  }

  // Changing the passcode only means something once it's actually stored
  // somewhere other than an env var nobody can edit from the browser.
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "Live settings storage isn't configured yet — passcode changes need the database set up first (see docs/DEPLOYMENT-guide.md)." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { currentPasscode, newPasscode } = (body ?? {}) as {
    currentPasscode?: string;
    newPasscode?: string;
  };

  if (typeof currentPasscode !== "string" || !(await verifyPasscode(currentPasscode))) {
    return NextResponse.json({ error: "Current passcode is incorrect." }, { status: 401 });
  }
  if (typeof newPasscode !== "string" || newPasscode.trim().length < 6) {
    return NextResponse.json({ error: "New passcode must be at least 6 characters." }, { status: 400 });
  }

  const ok = await setPasscode(newPasscode);
  if (!ok) {
    return NextResponse.json({ error: "Couldn't update the passcode — try again in a moment." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
