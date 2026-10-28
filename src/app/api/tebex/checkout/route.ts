import { NextRequest, NextResponse } from "next/server";
import { createCheckoutUrl } from "@/lib/tebex";

const USERNAME_RE = /^[A-Za-z0-9_]{3,16}$/;

// Minimal in-memory throttle: a speed bump against casual abuse of basket
// creation, NOT a real rate limiter. It resets on server restart and is
// per-instance only, so it does nothing useful if this ever runs across
// multiple serverless instances - see docs/SECURITY-checkup.md for the
// production recommendation (Vercel Firewall / Upstash).
const hits = new Map<string, number[]>();
function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 10;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooManyRequests(ip)) {
    return NextResponse.json(
      { error: "Too many attempts — wait a minute and try again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { username, rankId } = (body ?? {}) as { username?: string; rankId?: string };

  if (typeof username !== "string" || !USERNAME_RE.test(username)) {
    return NextResponse.json(
      { error: "That doesn't look like a valid Minecraft username (3-16 characters, letters/numbers/underscore)." },
      { status: 400 }
    );
  }
  if (typeof rankId !== "string" || !rankId) {
    return NextResponse.json({ error: "No rank selected." }, { status: 400 });
  }

  const origin = req.nextUrl.origin;
  const result = await createCheckoutUrl({
    rankId,
    username,
    completeUrl: `${origin}/store?checkout=complete`,
    cancelUrl: `${origin}/store?checkout=cancelled`,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ checkoutUrl: result.checkoutUrl });
}
