// Server-only helper for the Tebex Headless API.
// Docs: https://docs.tebex.io/developers/headless-api
//
// Verified against Tebex's live docs (Oct 2026) - both endpoints below
// match https://docs.tebex.io/developers/headless-api/guides/baskets.
//
// This file is only ever imported by src/app/api/tebex/checkout/route.ts
// (a server-side Route Handler), so TEBEX_PUBLIC_TOKEN never reaches the
// browser bundle.

const TEBEX_API_BASE = "https://headless.tebex.io/api/accounts";

// Map each in-game rank id (from StoreRanks.tsx) to the Tebex package ID
// you create in your webstore (Tebex Dashboard -> Packages). Can be the
// plain numeric package ID or its "ident" - Tebex accepts both.
// Leave a rank's env var unset and checkout for it will return a friendly
// "not configured" error instead of crashing.
const RANK_PACKAGE_MAP: Record<string, string | undefined> = {
  vip: process.env.TEBEX_PACKAGE_VIP,
  core: process.env.TEBEX_PACKAGE_CORE,
  boss: process.env.TEBEX_PACKAGE_BOSS,
  god: process.env.TEBEX_PACKAGE_GOD,
  nex: process.env.TEBEX_PACKAGE_NEX,
  custom: process.env.TEBEX_PACKAGE_CUSTOM,
};

export function isTebexConfigured(): boolean {
  return Boolean(process.env.TEBEX_PUBLIC_TOKEN);
}

export function getPackageIdForRank(rankId: string): string | null {
  return RANK_PACKAGE_MAP[rankId] ?? null;
}

interface TebexBasketResponse {
  data?: {
    ident?: string;
    links?: { checkout?: string };
  };
}

type CheckoutResult = { checkoutUrl: string } | { error: string; status: number };

// Reads Tebex's own error body so the real reason shows up in server
// logs instead of disappearing behind a generic masked message. Tebex's
// error shape isn't identical across endpoints, so this checks a few
// common fields before giving up.
async function describeError(res: Response): Promise<string> {
  try {
    const json = (await res.json()) as Record<string, unknown>;
    const msg = json.error_message ?? json.message ?? json.detail ?? json.error;
    return typeof msg === "string" ? msg : JSON.stringify(json);
  } catch {
    return `HTTP ${res.status} (no JSON body)`;
  }
}

export async function createCheckoutUrl(opts: {
  rankId: string;
  username: string;
  completeUrl: string;
  cancelUrl: string;
  ipAddress?: string;
}): Promise<CheckoutResult> {
  const token = process.env.TEBEX_PUBLIC_TOKEN;
  if (!token) {
    return {
      error: "Checkout's not live yet — grab this rank on Discord for now.",
      status: 503,
    };
  }

  const packageId = getPackageIdForRank(opts.rankId);
  if (!packageId) {
    return { error: "This rank isn't up for purchase yet — check back soon.", status: 503 };
  }

  const base = `${TEBEX_API_BASE}/${token}`;

  // 1. Create a basket. Minecraft stores must include `username` so Tebex
  // knows which account to deliver the rank to. `ip_address` is required
  // for backend/server-to-server baskets like this one — omit it and the
  // basket gets attributed to this server's own IP instead of the buyer's.
  let basketRes: Response;
  try {
    basketRes = await fetch(`${base}/baskets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        complete_url: opts.completeUrl,
        cancel_url: opts.cancelUrl,
        complete_auto_redirect: true,
        username: opts.username,
        ip_address: opts.ipAddress || undefined,
      }),
    });
  } catch (err) {
    console.error("[tebex] basket creation threw:", err);
    return { error: "Payment gateway's not responding — try again in a bit.", status: 502 };
  }

  if (!basketRes.ok) {
    const detail = await describeError(basketRes);
    console.error(`[tebex] basket creation failed (HTTP ${basketRes.status}): ${detail}`);

    if (basketRes.status === 401 || basketRes.status === 403) {
      return { error: "Checkout's misconfigured on our end (bad API token) — try again later.", status: 502 };
    }
    return { error: "Couldn't start checkout — try again in a moment.", status: 502 };
  }

  const basket = (await basketRes.json()) as TebexBasketResponse;
  const ident = basket.data?.ident;
  if (!ident) {
    console.error("[tebex] basket response had no ident:", JSON.stringify(basket));
    return { error: "Couldn't start checkout — try again in a moment.", status: 502 };
  }

  // 2. Add the selected rank's package to the basket.
  let addRes: Response;
  try {
    addRes = await fetch(`${base}/${ident}/packages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ package_id: packageId, quantity: 1 }),
    });
  } catch (err) {
    console.error("[tebex] add-package threw:", err);
    return { error: "Payment gateway's not responding — try again in a bit.", status: 502 };
  }

  if (!addRes.ok) {
    const detail = await describeError(addRes);
    console.error(`[tebex] add-package failed (HTTP ${addRes.status}, package_id=${packageId}): ${detail}`);

    if (addRes.status === 400 || addRes.status === 422) {
      return { error: "This rank isn't set up correctly in the store yet — check back soon.", status: 502 };
    }
    return { error: "Couldn't add that rank to your basket — try again.", status: 502 };
  }

  const addData = (await addRes.json()) as TebexBasketResponse;
  const checkoutUrl = addData.data?.links?.checkout ?? `https://pay.tebex.io/${ident}`;

  return { checkoutUrl };
}
