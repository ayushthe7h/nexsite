# Testing Plan — Store Checkout

**Relates to:** `docs/PRD-store-checkout.md`, `docs/ARCHITECTURE-tebex-checkout.md`

## 1. Scope

Covers the new checkout flow (`StoreRanks.tsx` Buy Now modal → `/api/tebex/checkout` → Tebex) plus regression coverage for the existing `/store` page it modifies, and the security fixes shipped alongside it (`next.config.ts` headers, `/panel` noindex, `robots.ts`).

## 2. Unit tests

| Target | Cases |
|---|---|
| Username validation (`USERNAME_RE` / `USERNAME_PATTERN`, duplicated in route + component — consider extracting to a shared util) | Valid: `Notch`, `a_b`, 16-char max. Invalid: 2 chars, 17 chars, spaces, emoji, SQL-ish strings (`'; DROP TABLE`), empty string. |
| `getPackageIdForRank` / `RANK_PACKAGE_MAP` | Each of the 6 rank ids resolves when env var set; returns `null` when unset; unknown rank id returns `null`. |
| `isTebexConfigured` | `false` when `TEBEX_PUBLIC_TOKEN` unset; `true` when set. |
| In-memory rate limiter (`tooManyRequests`) | 10 requests/min from one IP pass; the 11th is blocked; a different IP is unaffected; window expires after 60s (use a fake clock, don't `sleep` in tests). |

## 3. Integration tests (mock the Tebex API)

Run against `/api/tebex/checkout` with `fetch` mocked:

1. **Happy path**: basket create → 200, package add → 200 with `links.checkout` → route returns `{ checkoutUrl }`.
2. **Tebex not configured** (`TEBEX_PUBLIC_TOKEN` unset) → 503 with the "join Discord for now" message, *without* calling `fetch` at all.
3. **Unmapped rank** (valid rank id but its package env var unset) → 503, no network call.
4. **Basket create fails** (Tebex returns non-2xx, e.g. the documented 422 "invalid webstore ID") → 502, generic friendly error (never leak Tebex's raw error body to the client).
5. **Basket create times out / network error** → 502, friendly error, no unhandled rejection/crash.
6. **Add-package-to-basket fails** after a successful basket create → 502, friendly error. (Also worth manually checking: does a half-created basket on Tebex's side cause any issue? Likely not — it just expires — but confirm once real credentials exist.)
7. **Bad request bodies**: missing `username`, missing `rankId`, non-JSON body, `username` containing path/script injection attempts → 400, no call to Tebex.
8. **Rate limit**: 11 rapid requests from the same simulated IP → the 11th gets 429.

## 4. End-to-end / manual QA (needs a real or sandbox Tebex webstore)

Do this once real credentials are in `.env.local` and `NEXT_PUBLIC_TEBEX_ENABLED=true`, ideally against a Tebex **sandbox/test** package first:

- [ ] Each of the 6 rank cards shows **Buy Now** (not the old Discord CTA) once the flag is on.
- [ ] Opening the modal resets username/checkbox/error state from any previous attempt.
- [ ] Submitting with an invalid username shows the inline error and does **not** call the API.
- [ ] Submitting without checking the confirmation box shows the inline error.
- [ ] Valid username + checked box + click **Continue to Tebex** → redirected to a `pay.tebex.io` URL for the correct package/price.
- [ ] Completing a real/sandbox payment returns to `/store?checkout=complete`.
- [ ] Cancelling mid-checkout returns to `/store?checkout=cancelled` and the page still works normally (no stuck loading state).
- [ ] Double-clicking **Continue to Tebex** doesn't fire two basket-creation requests (the button disables itself while `checkoutLoading` is true — verify this holds under a slow/throttled network in devtools).
- [ ] Each of the 6 ranks maps to the *correct* Tebex package — price and perks on Tebex's checkout page must match what the card advertised. This is a manual cross-check per rank, not something code can verify for you.
- [ ] Currency toggle (INR/USD) still works and doesn't affect which Tebex package gets purchased (it's display-only — confirm this is the intended behavior per the PRD's open currency decision).
- [ ] Mobile Chrome + mobile Safari: modal is usable, redirect works (no popup-blocker issue since this is a full-page redirect, not a popup).
- [ ] Desktop Chrome/Firefox/Edge.
- [ ] Keyboard-only: can tab to Buy Now, into the modal fields, submit with Enter, and close the modal (Radix `Dialog` should give this for free — verify, don't assume).

## 5. Regression checks on the existing page

- [ ] "Inspect Kit & Commands" dialog still opens/closes correctly and is unaffected by the new Buy modal's state.
- [ ] Rank comparison matrix at the bottom of `/store` unaffected.
- [ ] With `NEXT_PUBLIC_TEBEX_ENABLED` unset/false (the default), the page looks and behaves **exactly as it did before this change** — "Coming Soon" banner, Discord CTA. This is the most important regression check: nothing should look different to a visitor until you deliberately flip the flag.

## 6. Security-focused checks (pairs with `docs/SECURITY-checkup.md`)

- [ ] Confirm `TEBEX_PUBLIC_TOKEN` never appears in client-side bundle output: after `npm run build`, grep `.next/static` for the token value — it should not be found (only `NEXT_PUBLIC_*` vars get inlined client-side).
- [ ] `complete_url`/`cancel_url` sent to Tebex are built server-side from `req.nextUrl.origin`, not taken from client input — confirm a request can't supply its own redirect URL (no open-redirect via this endpoint).
- [ ] Server-side username validation can't be bypassed by calling `/api/tebex/checkout` directly with curl/Postman (client-side validation is UX only, never the real guard).
- [ ] `/panel` is excluded via both `robots.ts` and its own route `metadata` (`robots: { index: false }`) — verify with `curl -s http://localhost:3000/robots.txt` after `npm run build && npm start`.
- [ ] Headers added in `next.config.ts` (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) actually appear on responses — `curl -I` against a running build.
- [ ] `npm audit` is clean (it was, as of this pass — re-run before each release since new advisories land regularly).

## 7. What this plan deliberately does not cover

- Load/stress testing the checkout endpoint — not warranted at current traffic scale; revisit if the server list grows.
- Automated testing of Tebex's own checkout page — that's Tebex's product, not this codebase's responsibility.
- Testing the in-game delivery plugin — separate system, separate test plan, lives on the Minecraft server side.
