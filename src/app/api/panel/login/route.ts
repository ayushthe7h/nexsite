import { NextRequest, NextResponse } from "next/server";
import { verifyPasscode } from "@/lib/admin-auth";

// Same in-memory speed-bump pattern as the other staff-facing endpoints
// (src/app/api/settings/route.ts, src/app/api/tebex/checkout/route.ts).
const hits = new Map<string, number[]>();
function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 10;
}

// Real server-side check for the /panel sign-in form. Previously this was
// a plain string comparison baked into the client bundle (see
// docs/SECURITY-checkup.md, finding #3) - anyone could read the passcode
// straight out of the JS. Moving verification here means the passcode
// itself never has to ship to the browser at all, and it's what makes
// /api/panel/change-password meaningful (changing it here actually
// changes what this endpoint accepts).
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooManyRequests(ip)) {
    return NextResponse.json({ error: "Too many attempts — wait a minute and try again." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { passcode } = (body ?? {}) as { passcode?: string };
  if (typeof passcode !== "string" || !(await verifyPasscode(passcode))) {
    return NextResponse.json({ ok: false, error: "Invalid staff passcode." }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
