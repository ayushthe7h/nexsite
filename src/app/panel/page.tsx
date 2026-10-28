"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Server,
  Activity,
  Lock,
  AlertTriangle,
  CheckCircle2,
  LogOut,
  ExternalLink,
  Power,
} from "lucide-react";
import { useSiteSettings } from "@/components/providers/SiteSettingsContext";
import { useToastNotification } from "@/components/landing/ToastContext";
import confetti from "canvas-confetti";

export default function AdminPanelPage() {
  const {
    settings: siteSettings,
    updateSettings: updateSiteSettings,
    resetSettings: resetSiteSettings,
    adminPasscode,
    setAdminPasscode,
    isLive,
    saveError,
  } = useSiteSettings();
  const { showToast } = useToastNotification();

  // Authentication is still just a client-side passcode check (login
  // itself isn't this panel's job to secure). What IS now real: once
  // logged in with a real passcode, every change this panel makes is
  // sent to /api/settings and saved in the live database, so it applies
  // to every visitor — not just this browser. Guest/Demo mode never
  // sends that passcode, so it stays a local-only preview and can never
  // touch the live site.
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isGuestMode, setIsGuestMode] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  useEffect(() => {
    if (saveError) {
      showToast("Save Failed", saveError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveError]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuth = localStorage.getItem("nexcore_panel_auth");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = passcode.toLowerCase();
    if (normalized === "admin123" || normalized === "nexcore2026") {
      setIsAuthenticated(true);
      setIsGuestMode(false);
      setAdminPasscode(normalized);
      localStorage.setItem("nexcore_panel_auth", "true");
      setAuthError("");
      showToast("Access Granted!", "Authenticated to the NexCoreMC admin panel");
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.2 } });
    } else {
      setAuthError("Invalid staff passcode. Not staff? Use Demo / Guest Mode below to preview the panel.");
    }
  };

  const handleGuestLogin = () => {
    setIsAuthenticated(true);
    setIsGuestMode(true);
    setAdminPasscode(null); // Guest mode never writes to the live database.
    setAuthError("");
    showToast("Demo Mode Activated", "Exploring the NexCoreMC admin panel as guest staff");
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.2 } });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsGuestMode(false);
    setAdminPasscode(null);
    localStorage.removeItem("nexcore_panel_auth");
    showToast("Logged Out", "Session ended successfully");
  };

  // If NOT authenticated, show the staff login screen
  if (!isAuthenticated) {
    return (
      <div className="pt-36 pb-24 px-4 sm:px-6 relative min-h-[85vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#111115]/95 border border-white/10 shadow-2xl relative overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff2e2e]/10 blur-[100px] rounded-full pointer-events-none" />

          {/* Logo & Header */}
          <div className="w-16 h-16 rounded-2xl bg-[#ff2e2e]/10 border border-[#ff2e2e]/25 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#ff2e2e]/20">
            <Lock className="w-8 h-8 text-[#ff2e2e]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-bold font-['Chakra_Petch'] tracking-wider uppercase mb-2">
            <span>STAFF DASHBOARD ACCESS</span>
          </div>

          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-extrabold text-white mb-2">
            NexCoreMC Admin Panel
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
            Enter the staff passcode to manage site-wide settings — maintenance mode, the announcement banner, and the server info shown on the website.
          </p>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-2 text-left">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Staff Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-[#161622] border border-white/10 text-white placeholder-zinc-500 text-sm font-mono focus:outline-none focus:border-[#ff2e2e] transition-colors"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff2e2e] to-[#b91c1c] hover:from-[#ff4545] hover:to-[#dc2626] text-white text-xs font-bold font-['Chakra_Petch'] tracking-wider uppercase shadow-lg shadow-[#ff2e2e]/30 cursor-pointer transition-all"
            >
              AUTHENTICATE ACCESS
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={handleGuestLogin}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-bold font-['Chakra_Petch'] tracking-wider transition-colors cursor-pointer"
            >
              EXPLORE IN DEMO / GUEST MODE
            </button>
            <div className="text-[11px] text-zinc-500 font-mono">
              Zero Database Required • 100% Free Hosting Ready
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Authenticated — Website Admin Panel
  // This panel controls the WEBSITE only (maintenance overlay, banner,
  // displayed server info, visual FX). It has no connection to the real
  // Minecraft server — that's configured separately on the server itself.
  return (
    <div className="pt-32 pb-24 relative selection:bg-[#ff2e2e]/30 selection:text-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#ff2e2e]/10 border border-[#ff2e2e]/30 flex items-center justify-center text-[#ff2e2e] shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-white">
                Website Admin Panel
              </h1>
              <p className="text-zinc-400 text-xs">
                Site-wide settings, maintenance mode, and the homepage announcement banner.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/uptime"
              className="px-3.5 py-2 rounded-xl bg-[#161622] hover:bg-[#202030] border border-white/10 text-xs font-bold font-['Chakra_Petch'] text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>PUBLIC UPTIME</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-[#161622] hover:bg-[#202030] border border-white/10 text-xs font-bold font-['Chakra_Petch'] text-zinc-300 hover:text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Logout session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>EXIT</span>
            </button>
          </div>
        </div>

        {/* Live/Preview status banner */}
        {isGuestMode ? (
          <div className="mb-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Demo / Guest Mode — these controls are preview-only and won&apos;t affect the live website.</span>
          </div>
        ) : isLive ? (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Connected to the live database — changes here apply to every visitor.</span>
          </div>
        ) : (
          <div className="mb-6 p-3.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>No live database connected yet — changes only apply in this browser until DATABASE_URL is configured.</span>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* 1. Site Maintenance Mode — is the website public or not */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl transition-all ${
            siteSettings.maintenanceMode
              ? "bg-amber-950/20 border-amber-500/50 shadow-amber-500/10"
              : "bg-[#111115]/90 border-white/10"
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  siteSettings.maintenanceMode
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                    : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                }`}>
                  {siteSettings.maintenanceMode ? <AlertTriangle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-white">
                      Is the Website Public?
                    </h2>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold font-['Chakra_Petch'] uppercase tracking-wider ${
                      siteSettings.maintenanceMode
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    }`}>
                      {siteSettings.maintenanceMode ? "MAINTENANCE — SITE LOCKED" : "LIVE & PUBLIC"}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                    When enabled, every visitor sees the maintenance overlay with your message and ETA instead of the site. Staff logged in here can still browse normally.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => {
                    const next = !siteSettings.maintenanceMode;
                    updateSiteSettings({ maintenanceMode: next });
                    showToast(
                      next ? "Site Maintenance ENABLED" : "Site Maintenance DISABLED",
                      next ? "Website is now in maintenance mode" : "Website restored to live public mode"
                    );
                  }}
                  className={`px-6 py-3 rounded-xl font-bold font-['Chakra_Petch'] text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 shadow-lg ${
                    siteSettings.maintenanceMode
                      ? "bg-emerald-500 hover:bg-emerald-600 text-black shadow-emerald-500/25"
                      : "bg-amber-500 hover:bg-amber-600 text-black shadow-amber-500/25"
                  }`}
                >
                  <Power className="w-4 h-4" />
                  <span>{siteSettings.maintenanceMode ? "MAKE PUBLIC AGAIN" : "TAKE SITE DOWN"}</span>
                </button>

                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Open Homepage in new tab to test"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label className="text-xs font-bold text-zinc-300 font-['Chakra_Petch'] uppercase block mb-1.5">
                  Maintenance Message (shown to visitors)
                </label>
                <textarea
                  rows={2}
                  value={siteSettings.maintenanceMessage}
                  onChange={(e) => updateSiteSettings({ maintenanceMessage: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#161622] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#ff2e2e]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-300 font-['Chakra_Petch'] uppercase block mb-1.5">
                    Estimated Completion Time (ETA)
                  </label>
                  <input
                    type="text"
                    value={siteSettings.maintenanceEta}
                    onChange={(e) => updateSiteSettings({ maintenanceEta: e.target.value })}
                    placeholder="e.g. Today at 11:30 PM IST"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#161622] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#ff2e2e]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 font-['Chakra_Petch'] uppercase block mb-1.5">
                    This Session
                  </label>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#161622] border border-white/10 text-xs text-zinc-300">
                    <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Logged in on this browser only — not tied to any account.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Global Top Announcement Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111115]/90 border border-white/10 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-white">
                  Homepage Announcement Bar
                </h3>
                <p className="text-zinc-400 text-xs">
                  Displays an alert marquee at the very top of every page across the website.
                </p>
              </div>

              <button
                onClick={() => {
                  const next = !siteSettings.topBannerEnabled;
                  updateSiteSettings({ topBannerEnabled: next });
                  showToast(
                    next ? "Announcement Bar Activated" : "Announcement Bar Hidden",
                    next ? "Visible across all pages" : "Disabled"
                  );
                }}
                className={`px-4 py-2 rounded-xl font-bold font-['Chakra_Petch'] text-xs tracking-wider uppercase transition-colors cursor-pointer ${
                  siteSettings.topBannerEnabled
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-white/5 text-zinc-400 border border-white/10"
                }`}
              >
                {siteSettings.topBannerEnabled ? "BANNER ACTIVE" : "BANNER DISABLED"}
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 font-['Chakra_Petch'] uppercase block mb-1.5">
                Announcement Message
              </label>
              <input
                type="text"
                value={siteSettings.topBannerText}
                onChange={(e) => updateSiteSettings({ topBannerText: e.target.value })}
                placeholder="e.g. 🔥 Weekend 2x Coins & XP Event is LIVE! Join now."
                className="w-full px-4 py-3 rounded-xl bg-[#161622] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#ff2e2e]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 font-['Chakra_Petch'] uppercase block mb-1.5">
                  Banner Alert Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "event", label: "🔥 Special Event" },
                    { id: "urgent", label: "⚠️ Urgent Alert" },
                    { id: "info", label: "ℹ️ Information" },
                    { id: "success", label: "✅ Milestone" },
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => updateSiteSettings({ topBannerType: theme.id as "event" | "urgent" | "info" | "success" })}
                      className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                        siteSettings.topBannerType === theme.id
                          ? "border-[#ff2e2e] bg-[#ff2e2e]/10 text-white font-bold"
                          : "border-white/5 bg-[#161622] text-zinc-400 hover:text-white"
                      }`}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 font-['Chakra_Petch'] uppercase block mb-1.5">
                  Target Action Link URL
                </label>
                <input
                  type="text"
                  value={siteSettings.topBannerLink}
                  onChange={(e) => updateSiteSettings({ topBannerLink: e.target.value })}
                  placeholder="https://discord.gg/nexcoremc or /store"
                  className="w-full px-4 py-3 rounded-xl bg-[#161622] border border-white/10 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-[#ff2e2e]"
                />
              </div>
            </div>
          </div>

          {/* 3. Server Info shown on the website (display-only — doesn't touch the real server) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111115]/90 border border-white/10 shadow-xl space-y-6">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-white pb-1">
                Server Info Displayed on the Website
              </h3>
              <p className="text-zinc-400 text-xs pb-3 border-b border-white/10">
                Edits what&apos;s shown to visitors (Hero, footer, join pages). Doesn&apos;t reconfigure the real Minecraft server — that&apos;s done on the server itself.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="font-bold text-zinc-400 uppercase font-['Chakra_Petch'] block mb-1">
                  Displayed Server IP
                </label>
                <input
                  type="text"
                  value={siteSettings.serverIp}
                  onChange={(e) => updateSiteSettings({ serverIp: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#161622] border border-white/10 text-white font-mono focus:outline-none focus:border-[#ff2e2e]"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-400 uppercase font-['Chakra_Petch'] block mb-1">
                  Java Edition Port
                </label>
                <input
                  type="text"
                  value={siteSettings.javaPort}
                  onChange={(e) => updateSiteSettings({ javaPort: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#161622] border border-white/10 text-white font-mono focus:outline-none focus:border-[#ff2e2e]"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-400 uppercase font-['Chakra_Petch'] block mb-1">
                  Bedrock UDP Port
                </label>
                <input
                  type="text"
                  value={siteSettings.bedrockPort}
                  onChange={(e) => updateSiteSettings({ bedrockPort: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#161622] border border-white/10 text-white font-mono focus:outline-none focus:border-[#ff2e2e]"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-400 uppercase font-['Chakra_Petch'] block mb-1">
                  Discord Invite URL
                </label>
                <input
                  type="text"
                  value={siteSettings.discordUrl}
                  onChange={(e) => updateSiteSettings({ discordUrl: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#161622] border border-white/10 text-white font-mono focus:outline-none focus:border-[#ff2e2e]"
                />
              </div>
            </div>
          </div>

          {/* 4. Visual FX & Website Client Controls */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111115]/90 border border-white/10 shadow-xl space-y-6">
            <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-white pb-3 border-b border-white/10">
              Visual FX & Website Client Controls
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#161622] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-xs font-['Chakra_Petch'] uppercase block">
                    Confetti on Copy IP
                  </span>
                  <span className="text-[11px] text-zinc-400">Fires red & white particles when visitors copy the server IP</span>
                </div>
                <button
                  onClick={() => updateSiteSettings({ fxConfetti: !siteSettings.fxConfetti })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${
                    siteSettings.fxConfetti ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/5 text-zinc-500"
                  }`}
                >
                  {siteSettings.fxConfetti ? "ENABLED" : "OFF"}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#161622] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-xs font-['Chakra_Petch'] uppercase block">
                    Ambient Neon Glow Effects
                  </span>
                  <span className="text-[11px] text-zinc-400">Dynamic pulsing red ambient glow in Hero & headers</span>
                </div>
                <button
                  onClick={() => updateSiteSettings({ fxGlow: !siteSettings.fxGlow })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${
                    siteSettings.fxGlow ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/5 text-zinc-500"
                  }`}
                >
                  {siteSettings.fxGlow ? "ENABLED" : "OFF"}
                </button>
              </div>
            </div>
          </div>

          {/* 5. Backup, Export & Factory Reset */}
          <div className="p-6 rounded-2xl bg-[#161622] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-bold text-white text-xs font-['Chakra_Petch'] uppercase block">
                Configuration Management
              </span>
              <span className="text-[11px] text-zinc-400">Settings automatically persist in your browser with zero database dependency.</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(siteSettings, null, 2));
                  showToast("Settings JSON Copied", "Backup copied to clipboard");
                }}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold font-['Chakra_Petch'] text-zinc-200 transition-colors cursor-pointer"
              >
                EXPORT JSON
              </button>
              <button
                onClick={() => {
                  if (confirm("Reset all website settings to factory defaults?")) {
                    resetSiteSettings();
                    showToast("Reset Complete", "Default site settings restored");
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-xs font-bold font-['Chakra_Petch'] text-red-400 transition-colors cursor-pointer"
              >
                RESET DEFAULTS
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
