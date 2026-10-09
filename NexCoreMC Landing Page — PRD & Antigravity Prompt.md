# NexCoreMC Landing Page — PRD & Antigravity Prompt

Use the PRD below to understand what NexCoreMC's landing page needs to do, then paste the full prompt into Antigravity to build it. The follow-up prompts at the end are for refining the build one piece at a time.

## PRD — NexCoreMC Landing Page

**Product:** Marketing/landing website for NexCoreMC, a Minecraft server. **Server IP:** nexcoremc.in **Primary goal:** Convert visitors (mostly from YouTube/Discord/word-of-mouth) into players who join the server and the Discord community.

### 1. Problem & Context

NexCoreMC is a Minecraft server offering Survival, Practice, Bedwars, Parkour, and Mini-Games. Right now there is no dedicated website — players rely on word-of-mouth or Discord links. A landing page is needed at the domain so new visitors instantly understand what the server offers, can copy the IP in one click, and are funneled toward joining Discord.

### 2. Target Audience

- Indian Minecraft players (Hinglish-speaking community), largely teens/young adults discovering the server via YouTube Shorts/Reels or Discord invites.
- Visiting primarily on mobile.

### 3. Goals / Success Metrics

- Visitor understands what the server is and what modes it offers within 5 seconds (hero section).
- Visitor can copy the server IP in one click with zero confusion.
- Visitor is nudged to join Discord (primary secondary CTA).
- Page loads fast and looks credible/premium — builds trust that this is a serious, active server.

### 4. Scope — In

- Single responsive landing page (not a multi-page site for v1).
- Sections: Navbar, Hero, Game Modes, How to Join, Features/Why Us, Discord CTA banner, Footer.
- Copy-to-clipboard IP button with confirmation toast.
- Scroll-reveal animations, smooth-scroll nav.
- Fully mobile responsive.

### 5. Scope — Out (v1)

- Live player count pulled from an actual server API (use a static/placeholder number for now).
- Store/shop/checkout functionality.
- User accounts / login.
- Blog or news section.
- Multi-language support (Hinglish/English copy only for now).

### 6. Functional Requirements

| # | Requirement | Priority |
| --- | --- | --- |
| 1 | Sticky navbar with logo + links (Home, Features, Store, Discord) + mobile hamburger menu | Must |
| 2 | Hero section with server name, tagline, glowing IP box, copy-to-clipboard button, Join Discord CTA | Must |
| 3 | Game Modes grid: Survival, Practice, Bedwars, Parkour, Mini-Games — icon + description per card, hover effect | Must |
| 4 | "How to Join" step-by-step guide (Open Minecraft → Multiplayer → Add Server → Paste IP) | Must |
| 5 | Features/Why Us grid (Anti-cheat, Custom plugins, Active community, Regular events, Economy system) | Should |
| 6 | Discord community CTA banner | Must |
| 7 | Footer with socials, quick links, copyright | Must |
| 8 | Copy IP button shows "Copied!" confirmation toast | Must |
| 9 | Scroll-reveal animations per section | Should |
| 10 | Smooth scroll for in-page nav links | Should |

### 7. Non-Functional Requirements

- Fully responsive across mobile, tablet, desktop — mobile is the priority breakpoint.
- Built with plain HTML/CSS/vanilla JS (no heavy frameworks) for fast load and easy hosting.
- Dark gaming aesthetic: deep navy/black base, neon cyan-purple gradient accents, glow/hover micro-interactions.
- Clean, launch-ready code — not a wireframe or placeholder-heavy draft.

### 8. Design Direction

Dark, premium gaming/esports look — think a blend of a Minecraft server site and a modern SaaS landing page. Bold display typography for headings, glowing accent borders on interactive elements, subtle particle/grid background texture, smooth hover/lift states on cards.

## Full Build Prompt (paste into Antigravity)

```
Build a premium, modern landing page for a Minecraft server called NexCoreMC 
(IP: nexcoremc.in — display this prominently with a one-click "Copy IP" button).

VIBE: Dark gaming aesthetic — deep navy/black background, neon cyan-purple 
gradient accents, glowing hover effects, subtle particle/grid background. 
Bold gamer-style typography (think Minecraft/esports energy but clean, not 
cluttered). Smooth scroll animations and micro-interactions.

SECTIONS NEEDED:
1. Navbar — logo "NexCoreMC", links (Home, Features, Store, Discord), 
   sticky on scroll, mobile hamburger menu
2. Hero — big server name, tagline, animated/glowing "nexcoremc.in" IP box 
   with copy-to-clipboard button, live player count badge (static number 
   placeholder is fine), two CTA buttons: "Join Discord" + "Copy IP"
3. Game Modes grid — cards for: Survival, Practice, Bedwars, Parkour, 
   Mini-Games — each with an icon, short description, hover glow/lift effect
4. How to Join — 3-4 step guide (Open Minecraft → Multiplayer → Add Server → 
   Paste IP) as a simple numbered/visual flow
5. Features/Why Us — grid of highlights (Anti-cheat, Custom plugins, Active 
   community, Regular events, Economy system — placeholder copy is fine)
6. Discord/Community CTA — banner section pushing Discord join
7. Footer — socials, quick links, copyright

TECHNICAL:
- Single responsive HTML page, works perfectly on mobile
- Use HTML + CSS + vanilla JS only (no frameworks)
- Copy IP button must actually copy "nexcoremc.in" to clipboard with a 
  "Copied!" confirmation toast
- Smooth scroll for nav links
- Scroll-reveal animations on each section as user scrolls down
- Optimize for fast load, clean code structure

Build this fully functional and polished — not a wireframe, a real 
launch-ready page.
```

## Follow-up Refinement Prompts (use after the base build, one at a time)

1. "Make the hero section more premium — add a subtle animated gradient background and a floating glow effect behind the server IP box"
2. "Add a player count / server status widget in the navbar that pulses green when online"
3. "Improve mobile responsiveness — check spacing and font sizes on small screens"
4. "Add smooth hover animations to the game mode cards (scale + glow on hover)"
5. "Polish the typography — use a bold gaming font for headings from Google Fonts"

Don't ask for everything at once — let the base build finish first, then feed these in one by one. This gives Antigravity room to focus and makes each change easy to review.
