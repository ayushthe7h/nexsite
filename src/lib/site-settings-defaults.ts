// Shared shape + defaults for the website's admin-controlled settings
// (maintenance mode, announcement banner, displayed server info, FX).
//
// Imported by BOTH the client-side SiteSettingsContext and the server-side
// /api/settings route handler, so this file must stay free of "use client"
// directives and browser-only APIs (no localStorage, no window).

export interface SiteSettings {
  // Maintenance Mode
  maintenanceMode: boolean;
  maintenanceMessage: string;
  maintenanceEta: string;
  allowStaffBypass: boolean;

  // Global Site Alert / Top Announcement Banner
  topBannerEnabled: boolean;
  topBannerText: string;
  topBannerType: "event" | "urgent" | "info" | "success";
  topBannerLink: string;

  // Store & Perks
  storeLive: boolean;
  storeDiscountCode: string;
  storeDiscountPercent: number;

  // Network & Social Links
  discordUrl: string;
  serverIp: string;
  javaPort: string;
  bedrockPort: string;

  // Visual FX
  fxConfetti: boolean;
  fxGlow: boolean;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  maintenanceMode: false,
  maintenanceMessage: "We are currently performing scheduled cluster upgrades and network latency optimization.",
  maintenanceEta: "Today at 11:30 PM IST",
  allowStaffBypass: true,

  topBannerEnabled: true,
  topBannerText: "🔥 Weekend 2x Coins & XP Event is LIVE across Survival SMP and Bedwars! Join now.",
  topBannerType: "event",
  topBannerLink: "https://discord.gg/nexcoremc",

  storeLive: false,
  storeDiscountCode: "LAUNCH20",
  storeDiscountPercent: 20,

  discordUrl: "https://discord.gg/nexcoremc",
  serverIp: "nexcoremc.in",
  javaPort: "25565",
  bedrockPort: "25567",

  fxConfetti: true,
  fxGlow: true,
};

// Merges any partial/unknown-shaped object (an older localStorage cache, a
// partial DB row, a bad request body) on top of the defaults, so a missing
// or unexpected field never crashes the app.
export function mergeWithDefaults(partial: unknown): SiteSettings {
  if (typeof partial !== "object" || partial === null) {
    return { ...DEFAULT_SETTINGS };
  }
  return { ...DEFAULT_SETTINGS, ...(partial as Partial<SiteSettings>) };
}
