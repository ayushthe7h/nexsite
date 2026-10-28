# PRD — NexCoreMC Store Checkout (v2)

**Status:** Draft v1 · 2026-10-27
**Owner:** NexCoreMC
**Relates to:** `src/components/landing/StoreRanks.tsx`, original site PRD (`NexCoreMC Landing Page — PRD & Antigravity Prompt.md`)

## 1. Background

The v1 landing page PRD explicitly scoped "Store/shop/checkout functionality" **out** of the first release. That build shipped a fully-designed rank catalog (`/store`) — six tiers (VIP+, CORE, BOSS, GOD, NEX, CUSTOM) with perks, commands and a PvP kit per tier, dual INR/USD pricing, and a comparison matrix — but every "buy" action currently points at Discord with a "CLAIM ON DISCORD (SOON)" label, and the page carries a "Store payment gateway is in final testing — COMING SOON" banner.

This PRD scopes the v2 work: **replace the placeholder with a real, working checkout**, modeled on the UX pattern seen on comparable Minecraft stores (e.g. Arcade Heaven's `store.arcadeheaven.net`: enter your Minecraft username, confirm it, continue to Tebex).

## 2. Goals

1. A visitor can go from "I want VIP+" to "I've paid and Tebex/my server will deliver the rank" without leaving the trust of the NexCoreMC site until the actual payment step.
2. Each of the 6 existing ranks becomes independently purchasable.
3. Checkout failure modes (typo'd username, Tebex not configured yet, network errors) degrade gracefully — never a blank screen or a silent failure.
4. Ship incrementally: the code can merge and deploy **before** Tebex is actually set up, with the storefront automatically falling back to the current "Coming Soon" / Discord behavior until it is. No "half-built" state is ever visible to real visitors.

## 3. Non-goals (v2)

- Coin/currency-based store model (Arcade Heaven's approach) — out of scope; this PRD keeps the existing **rank/subscription** model since it's already fully designed and content-complete.
- In-game delivery/plugin configuration on the Minecraft server itself — that happens entirely on Tebex's side (the official Tebex plugin) and is outside this repo. See Architecture doc, §4.
- Coupons, gift cards, creator codes, subscriptions/recurring billing beyond what Tebex provides by default.
- A full checkout-currency strategy (see Open Decisions below) — v2 ships with a documented interim answer, not a final one.

## 4. Target audience

Unchanged from the v1 PRD: Hinglish-speaking Indian Minecraft players, mostly on mobile, discovering the server via YouTube/Discord. Relevant implication for this feature: the checkout flow must work well on mobile (popups/new-tab redirects, not a desktop-only widget), and should not assume a card-only audience — Tebex's own checkout handles regional payment methods, which is one reason to delegate to Tebex's hosted page rather than building a custom payment UI.

## 5. User flow

1. Visitor browses `/store`, compares ranks in INR or USD.
2. Clicks **Buy Now** on a rank card.
3. Modal opens: Minecraft Java username field + a confirmation checkbox ("this is my exact username") + **Continue to Tebex**.
4. Client-side and server-side validate the username format (3–16 chars, letters/numbers/underscore — Java username rules).
5. Site creates a Tebex basket for that rank + username server-side, and redirects the visitor to Tebex's hosted checkout.
6. Visitor completes payment on Tebex (card/UPI/wallet per what the webstore has enabled).
7. Tebex redirects back to `/store?checkout=complete` (or `cancelled`).
8. Delivery to the in-game account happens via the Tebex plugin on the Minecraft server — independent of this website, see Architecture doc.

## 6. Functional requirements

| # | Requirement | Priority |
|---|---|---|
| 1 | Buy Now button per rank card, replacing the Discord CTA once checkout is configured | Must |
| 2 | Username + confirmation modal matching the existing dark/red visual language | Must |
| 3 | Server-side validation of username and rank before contacting Tebex (never trust the client) | Must |
| 4 | Friendly, specific error states: invalid username, rank not configured, Tebex unreachable, rate-limited | Must |
| 5 | Feature flag so the whole flow can ship dark (falls back to current Discord CTA) until Tebex is actually configured | Must |
| 6 | Redirect to Tebex-hosted checkout (not a custom payment form — see Architecture §2 for why) | Must |
| 7 | Basic abuse throttling on the checkout-start endpoint | Should |
| 8 | Post-checkout return messaging on `/store` (complete / cancelled states) | Should |
| 9 | Admin-side mapping from rank → Tebex package that's easy to fill in without touching component code | Must |

## 7. Success metrics

- **Checkout start rate**: % of `/store` visitors who open the Buy modal.
- **Checkout completion rate**: % of modal opens that reach Tebex (i.e., pass validation and get a checkout URL back) — isolates *our* funnel from Tebex's own payment conversion.
- **Error rate** on `/api/tebex/checkout` by error type (helps tell "people mistyping usernames" apart from "Tebex integration is broken").
- Zero reports of "I paid but didn't get my rank" that trace back to a *website* bug (vs. a delivery-side plugin/config issue, which is out of this repo's control).

## 8. Risks

- **Wrong username → wrong player gets the rank.** Mitigated by the explicit confirmation checkbox and showing the username back before redirect; Tebex itself has no way to verify the account is real/exists at basket-creation time for offline-mode usernames.
- **Currency mismatch between the site's INR/USD display and what Tebex actually charges** (see Open Decision below) — risk of visitor confusion/support tickets if not resolved before launch.
- **Chargebacks / refund requests** — no refund policy currently exists on the site (unlike the reference competitor, which has a dedicated Refund Policy page). Recommend adding one before going live with real payments.
- **Panel/`/uptime` style pages give an impression of a more mature ops setup than currently exists** — not blocking, but worth knowing before pointing real money at the site (see `docs/SECURITY-checkup.md`).

## 9. Open decisions (need your call before/alongside launch)

1. **Settlement currency.** Tebex webstores bill in one base currency. The site displays both INR and USD, but whichever you set as the Tebex webstore's currency is what actually gets charged — the other is cosmetic. Recommend picking one (likely INR, given the stated audience) and treating the other as "approx." in the UI copy.
2. **Refund / chargeback policy** — needs its own page before this is advertised as live, both for Tebex's own requirements and visitor trust.
3. **Who owns the Tebex account** — billing, payout destination, and who has dashboard access (ties into server delivery setup too).

## 10. Dependencies

- A Tebex account + webstore created for `nexcoremc.in`, with one Package per rank (same 6 tiers/prices as the site).
- The Tebex Minecraft plugin installed and configured on the actual game server for delivery — **not part of this repo**.
- Decisions in §9 resolved (or explicitly deferred with the interim default documented).
