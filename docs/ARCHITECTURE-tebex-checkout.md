# Architecture — Tebex Checkout Integration

**Status:** Implemented (scaffold) · 2026-10-27
**Relates to:** `docs/PRD-store-checkout.md`

## 1. Summary

The website's job is small and deliberately so: collect a Minecraft username, open a **Tebex-hosted** checkout session for the chosen rank, and redirect there. The website **never handles card details, never stores payment data, and never needs a "secret" payment key** — all of that lives on Tebex's side. Actually crediting the rank in-game is a separate system (the Tebex plugin on the Minecraft server) that this repo does not touch.

```
Visitor                 Next.js site                    Tebex Headless API           Tebex-hosted checkout
   |  click "Buy Now"        |                                   |                            |
   |------------------------>|                                   |                            |
   |  enter username, confirm|                                   |                            |
   |------------------------>|                                   |                            |
   |                         |  POST /api/tebex/checkout         |                            |
   |                         |  (validate username + rank)       |                            |
   |                         |---- POST /baskets --------------->|                            |
   |                         |<--- basket.ident ------------------|                            |
   |                         |---- POST /{ident}/packages ------->|                            |
   |                         |<--- links.checkout ----------------|                            |
   |<--- { checkoutUrl } ----|                                   |                            |
   |  redirect browser ---------------------------------------------------------------------->|
   |                                                                                            |  pay (card/UPI/etc.)
   |<-------------------------------------------- redirect to complete_url / cancel_url --------|
```

Delivery (separate system, not in this repo):

```
Tebex  --webhook/sync-->  Tebex plugin on the Minecraft server  --grants rank via LuckPerms/commands-->  Player
```

## 2. Why redirect to Tebex instead of building a custom payment form

Three reasons, in order of importance:

1. **PCI scope.** The moment you collect a card number yourself, you're in PCI-DSS territory. Redirecting to `pay.tebex.io` keeps that entirely on Tebex.
2. **Documented and stable.** Tebex's Checkout API explicitly documents the redirect flow: once a basket exists, `GET`-ing its `links.checkout` (or building `https://pay.tebex.io/{basket_ident}`) gives you the URL — no extra auth, no extra endpoint. This is the simplest integration surface they expose.
3. **Payment method coverage.** Tebex's hosted checkout already supports the regional payment methods relevant to the stated audience (India) without this codebase needing to integrate each one individually.

**Upgrade path (not built now):** Tebex also offers **Tebex.js**, which embeds the same checkout as an on-site popup (`Tebex.checkout.init({ ident }); Tebex.checkout.launch();`) so the visitor never leaves nexcoremc.in. It needs the same basket `ident` this scaffold already produces — swapping from redirect to embedded popup later is a front-end-only change (add the Tebex.js script, call `launch()` instead of `window.location.href`). Deferred because the exact script include/CDN URL wasn't confirmed against live docs at implementation time — confirm at `https://docs.tebex.io/developers/tebex.js/overview` before wiring it up.

## 3. What's in this repo

| File | Purpose |
|---|---|
| `src/lib/tebex.ts` | Server-only helper: rank→package-id map (from env vars), `createCheckoutUrl()` which does the two Headless API calls (create basket, add package) and returns a checkout URL or a typed error. |
| `src/app/api/tebex/checkout/route.ts` | The only HTTP endpoint this feature adds. `POST { username, rankId }` → `{ checkoutUrl }` or `{ error }`. Validates input, rate-limits by IP, never trusts the client's price/rank data (price is whatever the Tebex package is configured with — the site never sends a price). |
| `src/components/landing/StoreRanks.tsx` | UI: Buy Now button (feature-flagged), username/confirm modal, calls the API route, redirects on success. |
| `.env.example` | All the config this feature needs — see §5. |

## 4. The boundary this repo stops at

**In-game delivery is not part of this website.** Once Tebex has a completed payment, crediting the player's rank (LuckPerms group, chat tag, etc.) happens through:

1. The **Tebex Store plugin** (the modern one is usually installed as `tebex.jar`/`buycraft.jar` depending on version) installed on the actual Minecraft server, configured with a **secret key** from the same Tebex webstore.
2. Inside the Tebex Dashboard, each Package has a list of in-game **Commands** to execute on delivery (e.g. `lp user {username} parent add vip`), configured per-package.

None of that secret key or plugin config belongs in this repo, in an env var here, or anywhere near the Next.js app. Keep it entirely on the server/Tebex-dashboard side.

## 5. Configuration (env vars — see `.env.example`)

| Variable | Where it's used | Secret? |
|---|---|---|
| `TEBEX_PUBLIC_TOKEN` | `src/lib/tebex.ts`, server-side only | Tebex calls this a *public* token (it's the webstore identifier used in the API path), but it's still kept server-side here rather than exposed via `NEXT_PUBLIC_` — no reason to hand it to the client when a server call works just as well, and it keeps the option open to add stricter validation/rate-limiting later. |
| `TEBEX_PACKAGE_VIP` / `_CORE` / `_BOSS` / `_GOD` / `_NEX` / `_CUSTOM` | `src/lib/tebex.ts` | Not secret — these are just package idents. Each maps a rank id (from `StoreRanks.tsx`) to the Tebex Package you create for it. |
| `NEXT_PUBLIC_TEBEX_ENABLED` | `src/components/landing/StoreRanks.tsx` (client) | Not secret — a plain feature flag. Must be exactly `"true"` to show the live Buy Now flow; any other value (including unset) keeps the current "Coming Soon" Discord CTA, so this ships safely before Tebex is actually set up. |

## 6. Setup checklist (what you still need to do on Tebex's side)

1. Create a Tebex account and a webstore for `nexcoremc.in`.
2. Decide the webstore's **base currency** (see PRD §9 — this is what visitors are actually charged, regardless of the site's INR/USD toggle).
3. Create 6 Packages, one per rank, matching the names/prices already on the site (VIP+ ₹129, CORE ₹249, BOSS ₹459, GOD ₹899, NEX ₹1199, CUSTOM ₹1899, or their USD equivalents depending on the currency decision). Copy each Package's **ident**.
4. Under each Package, set the in-game delivery **Commands** (requires the Tebex plugin on the server — step 6).
5. Get the webstore's **public token** from the Tebex dashboard (Headless API / Checkout settings).
6. Install the official Tebex Store plugin on the Minecraft server and configure it with the webstore's secret key (this key is never used by this website).
7. Fill in `.env.local` (copy from `.env.example`) with the public token + 6 package idents, set `NEXT_PUBLIC_TEBEX_ENABLED=true`, redeploy.
8. Do one real test purchase end-to-end before announcing it publicly.

## 7. Known gaps / things to revisit before relying on this in production

- **`package_id` field name and the `/{basketIdent}/packages` endpoint shape** were confirmed against Tebex's live docs at the time of writing (Oct 2026) but Tebex has changed Headless API details before — re-check `https://docs.tebex.io/developers/headless-api` before going live, and watch the first real request's response shape in logs.
- **Rate limiting is in-memory** (`src/app/api/tebex/checkout/route.ts`) — fine for a single Node process, useless if this ever runs on serverless with multiple instances (e.g. standard Vercel deployment). See `docs/SECURITY-checkup.md` for the production recommendation.
- **No webhook receiver is built.** This integration doesn't need one for basic delivery (that's the plugin's job), but if you later want the *website itself* to react to a completed purchase (e.g. post an announcement to the NexCoreMC Discord bot), that would be a new, separate piece of work with its own signature-verification requirements — not scoped here.
