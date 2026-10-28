# Security Checkup — NexCoreMC Site

**Date:** 2026-10-27
**Scope:** Full repo scan (`nexsite`), focused extra attention on the new Tebex checkout surface.

Legend: 🔴 Critical · 🟠 High · 🟡 Moderate · 🔵 Informational. **Fixed** = already patched in this pass. **Open** = still needs a decision/action from you.

---

## 🔴 1. Next.js 16.4.0 — unauthenticated RCE — **FIXED**

`npm audit` surfaced a **critical** advisory for the exact Next.js version this project was pinned to:

- [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw) — unauthenticated remote code execution in the Image Optimization API when SVG files are used.
- [GHSA-673q-mjm6-r5xr](https://github.com/advisories/GHSA-673q-mjm6-r5xr) — unauthenticated RCE in `use cache` functions returning typed arrays.
- [GHSA-p3m5-59mp-jv5r](https://github.com/advisories/GHSA-p3m5-59mp-jv5r) — DoS in App Router Server Actions.

**Affected range:** `next` 16.0.0–16.4.0. This project was on exactly `16.4.0`.

**Fix applied:** upgraded to `next@16.4.3` + matching `eslint-config-next@16.4.3` (patch release, no breaking changes). Confirmed via `npm audit` → **0 vulnerabilities** after `npm audit fix`.

This was, by a wide margin, the most important finding in this pass — everything else below is lower severity.

## 🟠 2. Transitive dependency vulnerabilities — **FIXED**

`npm audit` also flagged 7 more (high/moderate) in transitive dev-tooling dependencies, none reachable from your actual app code (confirmed `zod` isn't imported anywhere in `src/`; it only came in via `eslint-config-next` and the `shadcn` CLI):

- `zod` <4.6.6 — memory exhaustion on oversized input (high)
- `undici` 7.0.0–7.30.0 — DoS via unbounded `EventSource` parsing + a few related issues (high/moderate)
- `body-parser` 2.0.0–2.3.0 — DoS via trailing bytes after a compressed body (high)
- `fast-uri`, `ip-address` — URI/host parsing edge cases, ReDoS (moderate)

**Fix applied:** `npm audit fix` (no `--force` needed — all had non-breaking fixes available). Confirmed clean afterward.

**Action for you:** none right now. Re-run `npm audit` periodically — this class of advisory shows up regularly for any actively-maintained stack.

## 🟡 3. `/panel` exposed its "staff" passcodes to every visitor — **FIXED (partially — see note)**

`/panel` (and its alias `/control-panel`) is a fully client-side demo — confirmed it makes no real API/server calls; player list, console logs, maintenance/whitelist toggles are all simulated or `localStorage`-only. **It does not control your real Minecraft server.** That matters, because it means this was never a "someone can actually touch your server" vulnerability — but it was a credibility/exposure issue:

- The login error message literally printed both working passcodes (`admin123`, `nexcore2026`) as a "hint" to anyone who got it wrong once.
- The input's placeholder text also showed `admin123` as an example before any failed attempt.

**Fixed:** removed both strings. The error now points people to the honest "Demo / Guest Mode" button instead of handing out the real passcode.

**Not fixed, and can't fully be — know this going forward:** the passcode comparison (`passcode === "admin123" || "nexcore2026"`) still ships in the client JS bundle, because this is a client-only page with no backend. There is no way to make client-side-only auth actually secure — anyone who inspects the bundle can still find it. This is fine **only as long as `/panel` stays purely cosmetic**. If you ever wire real server control into this page, this auth model needs to be rebuilt server-side first — flagging that now so it isn't forgotten later.

Also added: `/panel` is now excluded from search indexing (`robots.ts` + route-level `metadata.robots`), so it can't be mistaken for a real admin tool by anyone who finds it via Google.

## 🔵 4. No baseline security headers — **FIXED**

`next.config.ts` had no `headers()` config at all. Added a conservative baseline that shouldn't affect anything already on the site:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

**Deliberately not added:** a Content-Security-Policy. A strict CSP is worth having eventually, but writing one correctly requires knowing every external script/domain the site will load (fonts, Tebex's checkout redirect, analytics if you add any later) — guessing one now risks silently breaking something with no easy way for me to verify it from here. Recommend revisiting once the Tebex integration is live and stable.

## 🔵 5. Secrets hygiene — **good, no action needed**

- No `.env*` files exist in the repo currently, and `.gitignore` already excludes `.env*` — clean baseline.
- The new Tebex integration follows the same pattern: `.env.example` documents the shape with empty values; real values go in `.env.local`, which stays untracked.
- `TEBEX_PUBLIC_TOKEN` is read server-side only (`src/lib/tebex.ts`, used only by the Route Handler) — never exposed via a `NEXT_PUBLIC_` prefix, so it won't end up in the browser bundle. Verify this stays true after any future edits with: build the app, then `grep` `.next/static` for the token value.

## 🟡 6. New checkout endpoint — mitigations shipped, one gap flagged

`/api/tebex/checkout` is new surface area, so it got its own review:

- ✅ Server-side validates `username` (regex) and `rankId` (must resolve to a known rank) — client-side validation is UX only, never trusted.
- ✅ `complete_url`/`cancel_url` sent to Tebex are built from the server's own `req.nextUrl.origin`, never from client input — no open-redirect.
- ✅ Price/package is looked up server-side from `rankId`; the client never sends or influences a price.
- ✅ Tebex error responses are never passed through verbatim to the client — generic friendly messages only, avoiding leaking any internal details.
- ⚠️ **Open gap:** rate limiting is a simple in-memory counter (10 req/min/IP). It works for a single long-running Node process but does **nothing** if this ever runs across multiple serverless instances (e.g. a standard Vercel deployment auto-scales to several instances, each with its own counter). Not urgent at current traffic, but don't mistake it for real protection at scale — swap in Vercel's Firewall rate limiting or Upstash Redis-backed limiting before/if traffic grows, or before this becomes a public "buy rank" button announced widely.

## 🔵 7. `useServerStatus.ts` third-party calls — no issue found

Polls `mcstatus.io` / `mcsrvstat.us` read-only, 4s timeout, no credentials attached, multiple fallbacks. Nothing sensitive in transit either direction. No action needed.

## 🔵 8. Process note for future `npm install`s on this machine

Unrelated to app security, but worth recording: this machine's `node_modules` had **dozens of stale `.packagename-<hash>` temp folders** left over from previous interrupted installs, which made every subsequent `npm install`/`npm audit fix` fail with `ENOTEMPTY` until cleaned up. If `npm install` ever throws `ENOTEMPTY` again, the fix is: delete the specific stale `node_modules/.{pkg}-{hash}` folder the error names, then retry. Running `npm install` directly in a local terminal (not through a remote/bridged connection) was also noticeably faster and more reliable than doing it through this session — worth doing dependency work locally going forward.

---

## Summary

| # | Finding | Severity | Status |
|---|---|---|---|
| 1 | Next.js unauthenticated RCE (16.4.0) | 🔴 Critical | Fixed |
| 2 | 7 transitive dependency vulns | 🟠 High/🟡 Moderate | Fixed |
| 3 | `/panel` leaked its own passcodes in UI text | 🟡 Moderate (not exploitable today, but bad practice) | Fixed (string exposure); client-only auth model is an inherent limitation, not "fixed" |
| 4 | Missing baseline security headers | 🔵 Low | Fixed |
| 5 | Secrets hygiene | — | Already clean |
| 6 | Checkout endpoint rate limiting | 🟡 Moderate at scale | Mitigated, flagged for revisit |
| 7 | Third-party status polling | — | No issue |

No open-and-unmitigated findings remain at the current scale of the site. The one thing genuinely worth a decision from you before this goes live with real payments: a refund policy page (see `docs/PRD-store-checkout.md`, §9) — not a security issue per se, but adjacent, and Tebex/your users will expect one.
