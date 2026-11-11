"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Server,
  Lock,
  AlertTriangle,
  CheckCircle2,
  LogOut,
  ExternalLink,
  Power,
  Megaphone,
  Sparkles,
  Database,
  Home,
  Copy,
  Check,
  MessageCircle,
  KeyRound,
} from "lucide-react";
import { useSiteSettings } from "@/components/providers/SiteSettingsContext";
import { useToastNotification } from "@/components/landing/ToastContext";
import confetti from "canvas-confetti";

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

// A spring-animated pill switch — used for the simple on/off settings
// (banner visibility, visual FX). Maintenance mode gets its own explicit
// button further down since it's the one genuinely consequential action
// on this page and deserves to read as a decision, not a toggle.
function PillSwitch({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      aria-label={label}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors cursor-pointer ${
        on ? "bg-[#ff2e2e] border-[#ff2e2e]" : "bg-white/10 border-white/10"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="h-[18px] w-[18px] rounded-full bg-white shadow-sm"
        style={{ marginLeft: on ? 22 : 2 }}
      />
    </button>
  );
}

// A labeled value field with a one-click copy button — mirrors the
// "Project ID" / credential pattern from a modern dashboard, and happens
// to be genuinely useful here since these are the IP/ports staff share.
function CopyField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <label className="text-xs text-zinc-400 block mb-1.5">{label}</label>
      <div className="flex items-center gap-1.5 rounded-xl bg-white/[0.04] border border-white/10 pr-1.5 focus-within:border-[#ff2e2e]/60 transition-colors">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 px-3.5 py-2.5 bg-transparent text-white text-sm font-mono focus:outline-none"
        />
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          className="shrink-0 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Copy"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

// A card wrapper with the icon + title + subtitle header used throughout.
function SettingsCard({
  id,
  icon,
  title,
  subtitle,
  action,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
      className="scroll-mt-28 rounded-2xl bg-[#111114]/90 border border-white/[0.08] p-6 sm:p-7"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-white/[0.06]">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ff4545] shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="text-white font-semibold text-[15px]">{title}</h3>
            <p className="text-zinc-500 text-xs mt-0.5">{subtitle}</p>
          </div>
        </div>
        {action}
      </div>
      {children}
    </motion.section>
  );
}

const cardStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

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
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // Change-password form (Security card, below).
  const [currentPasscodeInput, setCurrentPasscodeInput] = useState<string>("");
  const [newPasscodeInput, setNewPasscodeInput] = useState<string>("");
  const [confirmPasscodeInput, setConfirmPasscodeInput] = useState<string>("");
  const [changePasswordError, setChangePasswordError] = useState<string>("");
  const [changePasswordLoading, setChangePasswordLoading] = useState<boolean>(false);

  useEffect(() => {
    if (saveError) {
      showToast("Save failed", saveError);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = passcode.toLowerCase();
    setLoginLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/panel/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: normalized }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setIsAuthenticated(true);
        setAdminPasscode(normalized);
        localStorage.setItem("nexcore_panel_auth", "true");
        setAuthError("");
        showToast("Access granted", "Authenticated to the NexCoreMC admin panel");
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.2 } });
      } else {
        setAuthError(data.error || "Invalid staff passcode.");
      }
    } catch {
      setAuthError("Couldn't reach the server — check your connection and try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordError("");

    if (newPasscodeInput.trim().length < 6) {
      setChangePasswordError("New passcode must be at least 6 characters.");
      return;
    }
    if (newPasscodeInput !== confirmPasscodeInput) {
      setChangePasswordError("New passcode and confirmation don't match.");
      return;
    }

    setChangePasswordLoading(true);
    try {
      const res = await fetch("/api/panel/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPasscode: currentPasscodeInput,
          newPasscode: newPasscodeInput,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setAdminPasscode(newPasscodeInput.trim().toLowerCase());
        setCurrentPasscodeInput("");
        setNewPasscodeInput("");
        setConfirmPasscodeInput("");
        showToast("Passcode updated", "Use the new passcode next time you sign in.");
      } else {
        setChangePasswordError(data.error || "Couldn't update the passcode — try again.");
      }
    } catch {
      setChangePasswordError("Couldn't reach the server — check your connection and try again.");
    } finally {
      setChangePasswordLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminPasscode(null);
    localStorage.removeItem("nexcore_panel_auth");
    showToast("Logged out", "Session ended successfully");
  };

  // ---------------------------------------------------------------------
  // Not authenticated — staff sign-in
  // ---------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 px-4 sm:px-6 relative min-h-[85vh] flex items-center justify-center bg-[#09090b]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm p-8 rounded-2xl bg-[#111114] border border-white/10 relative overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#ff2e2e]/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="w-11 h-11 rounded-xl bg-[#ff2e2e]/10 border border-[#ff2e2e]/25 flex items-center justify-center mx-auto mb-5 text-[#ff4545]">
            <Lock className="w-5 h-5" />
          </div>

          <h1 className="text-white text-lg font-semibold mb-1.5">Staff sign in</h1>
          <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
            Enter the staff passcode to manage maintenance mode, the announcement banner, and the server info shown on the site.
          </p>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2 text-left">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              placeholder="Staff passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#ff2e2e]/60 transition-colors"
              autoFocus
            />

            <motion.button
              whileHover={{ scale: loginLoading ? 1 : 1.01 }}
              whileTap={{ scale: loginLoading ? 1 : 0.98 }}
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-xl bg-[#ff2e2e] hover:bg-[#ff4545] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold cursor-pointer transition-colors"
            >
              {loginLoading ? "Signing in..." : "Sign in"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ---------------------------------------------------------------------
  // Authenticated — dashboard
  // ---------------------------------------------------------------------
  const fxEnabledCount = [siteSettings.fxConfetti, siteSettings.fxGlow].filter(Boolean).length;

  const navItems = [
    { id: "maintenance", label: "Maintenance", icon: <Power className="w-4 h-4" /> },
    { id: "announcement", label: "Announcement", icon: <Megaphone className="w-4 h-4" /> },
    { id: "server-info", label: "Server info", icon: <Server className="w-4 h-4" /> },
    { id: "visual-fx", label: "Visual FX", icon: <Sparkles className="w-4 h-4" /> },
    { id: "data", label: "Data", icon: <Database className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <KeyRound className="w-4 h-4" /> },
  ];

  return (
    <div className="pt-32 pb-16 relative bg-[#09090b] min-h-screen selection:bg-[#ff2e2e]/30 selection:text-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
        {/* ---------------------------------------------------------- */}
        {/* Sidebar */}
        {/* ---------------------------------------------------------- */}
        <aside className="hidden lg:flex flex-col h-[calc(100vh-8rem)] sticky top-32 pb-8">
          <div className="flex items-center gap-2.5 px-1 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#ff2e2e] flex items-center justify-center text-white font-bold text-sm shrink-0">
              N
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-semibold truncate">NexCoreMC</div>
              <div className="text-zinc-500 text-[11px] truncate">Staff panel</div>
            </div>
          </div>

          <nav className="flex-1 space-y-6 text-sm">
            <div>
              <div className="px-2 text-[11px] font-medium text-zinc-600 uppercase tracking-wide mb-1.5">Overview</div>
              <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-white/[0.06] text-white">
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
            </div>

            <div>
              <div className="px-2 text-[11px] font-medium text-zinc-600 uppercase tracking-wide mb-1.5">Settings</div>
              <div className="space-y-0.5">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="px-2 text-[11px] font-medium text-zinc-600 uppercase tracking-wide mb-1.5">Support</div>
              <div className="space-y-0.5">
                <a
                  href={siteSettings.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discord</span>
                </a>
              </div>
            </div>
          </nav>

          <div className="pt-4 mt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2.5 px-2 py-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#ff2e2e]/15 text-[#ff4545]">
                S
              </div>
              <div className="min-w-0">
                <div className="text-white text-xs font-medium truncate">Staff</div>
                <div className="text-zinc-500 text-[11px] truncate">Full access</div>
              </div>
              <button
                onClick={handleLogout}
                title="Sign out"
                className="ml-auto p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
            <Link
              href="/"
              className="flex items-center gap-1.5 px-2 py-2 text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span>View live site</span>
            </Link>
          </div>
        </aside>

        {/* ---------------------------------------------------------- */}
        {/* Content */}
        {/* ---------------------------------------------------------- */}
        <div className="min-w-0">
          {/* Mobile-only top bar (sidebar is lg+ only) */}
          <div className="flex lg:hidden items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#ff2e2e] flex items-center justify-center text-white font-bold text-xs">N</div>
              <span className="text-white text-sm font-semibold">Staff panel</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300 text-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          </div>

          <div className="text-xs text-zinc-600 mb-2 hidden sm:block">NexCoreMC / Staff / Dashboard</div>
          <h1 className="text-white text-2xl font-semibold mb-1.5">Dashboard</h1>
          <p className="text-zinc-500 text-sm mb-5">
            Maintenance mode, the announcement banner, and the server info shown on the website.
          </p>

          {/* Status chip row */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-zinc-300">
              {siteSettings.maintenanceMode ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Site in maintenance
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Site is public
                </>
              )}
            </span>

            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300">
                <CheckCircle2 className="w-3 h-3" />
                Live database connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-zinc-400">
                <AlertTriangle className="w-3 h-3" />
                No live database — changes stay in this browser
              </span>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const next = !siteSettings.maintenanceMode;
                updateSiteSettings({ maintenanceMode: next });
                showToast(
                  next ? "Site maintenance enabled" : "Site maintenance disabled",
                  next ? "Visitors now see the maintenance overlay" : "Website restored to public"
                );
              }}
              className={`ml-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                siteSettings.maintenanceMode
                  ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                  : "bg-amber-500 hover:bg-amber-400 text-black"
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              {siteSettings.maintenanceMode ? "Make public again" : "Take site down"}
            </motion.button>
          </div>

          {/* Stat tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <div className="rounded-xl bg-[#111114]/90 border border-white/[0.08] p-4">
              <div className="flex items-center gap-1.5 text-zinc-500 text-xs mb-2">
                <Megaphone className="w-3.5 h-3.5" />
                <span>Banner</span>
              </div>
              <div className="text-white text-lg font-semibold">{siteSettings.topBannerEnabled ? "Active" : "Off"}</div>
            </div>
            <div className="rounded-xl bg-[#111114]/90 border border-white/[0.08] p-4">
              <div className="flex items-center gap-1.5 text-zinc-500 text-xs mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Visual FX</span>
              </div>
              <div className="text-white text-lg font-semibold">{fxEnabledCount}/2 enabled</div>
            </div>
            <div className="rounded-xl bg-[#111114]/90 border border-white/[0.08] p-4 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-zinc-500 text-xs mb-2">
                <Database className="w-3.5 h-3.5" />
                <span>Settings storage</span>
              </div>
              <div className="text-white text-lg font-semibold">{isLive ? "Live database" : "This browser only"}</div>
            </div>
          </div>

          {/* Settings cards */}
          <motion.div
            variants={cardStagger}
            initial="hidden"
            animate="show"
            className="space-y-5"
          >
            {/* 1. Maintenance */}
            <SettingsCard
              id="maintenance"
              icon={<Power className="w-4 h-4" />}
              title="Maintenance mode"
              subtitle="When enabled, visitors see the maintenance overlay instead of the site. Staff logged in here still browse normally."
              action={
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white text-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Preview homepage
                </a>
              }
            >
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5">Message shown to visitors</label>
                  <textarea
                    rows={2}
                    value={siteSettings.maintenanceMessage}
                    onChange={(e) => updateSiteSettings({ maintenanceMessage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff2e2e]/60 transition-colors resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1.5">Estimated completion</label>
                    <input
                      type="text"
                      value={siteSettings.maintenanceEta}
                      onChange={(e) => updateSiteSettings({ maintenanceEta: e.target.value })}
                      placeholder="e.g. Today at 11:30 PM IST"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff2e2e]/60 transition-colors"
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-500 w-full">
                      <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>This login is local to your browser, not tied to an account.</span>
                    </div>
                  </div>
                </div>
              </div>
            </SettingsCard>

            {/* 2. Announcement banner */}
            <SettingsCard
              id="announcement"
              icon={<Megaphone className="w-4 h-4" />}
              title="Homepage announcement bar"
              subtitle="A dismissible alert strip at the top of every page."
              action={
                <PillSwitch
                  on={siteSettings.topBannerEnabled}
                  label="Toggle announcement bar"
                  onToggle={() => {
                    const next = !siteSettings.topBannerEnabled;
                    updateSiteSettings({ topBannerEnabled: next });
                    showToast(next ? "Announcement bar on" : "Announcement bar off", next ? "Visible across the site" : "Hidden");
                  }}
                />
              }
            >
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5">Message</label>
                  <input
                    type="text"
                    value={siteSettings.topBannerText}
                    onChange={(e) => updateSiteSettings({ topBannerText: e.target.value })}
                    placeholder="e.g. 🔥 Weekend 2x Coins & XP Event is LIVE! Join now."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff2e2e]/60 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1.5">Style</label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: "event", label: "🔥 Event" },
                        { id: "urgent", label: "⚠️ Urgent" },
                        { id: "info", label: "ℹ️ Info" },
                        { id: "success", label: "✅ Success" },
                      ].map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => updateSiteSettings({ topBannerType: theme.id as "event" | "urgent" | "info" | "success" })}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
                            siteSettings.topBannerType === theme.id
                              ? "border-[#ff2e2e] bg-[#ff2e2e]/10 text-white"
                              : "border-white/10 bg-transparent text-zinc-400 hover:text-white"
                          }`}
                        >
                          {theme.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1.5">Link URL</label>
                    <input
                      type="text"
                      value={siteSettings.topBannerLink}
                      onChange={(e) => updateSiteSettings({ topBannerLink: e.target.value })}
                      placeholder="https://discord.gg/nexcoremc or /store"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#ff2e2e]/60 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </SettingsCard>

            {/* 3. Server info */}
            <SettingsCard
              id="server-info"
              icon={<Server className="w-4 h-4" />}
              title="Server info shown on the website"
              subtitle="Updates the Hero, footer, and join pages — not the real Minecraft server, which is configured separately."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CopyField label="Displayed server IP" value={siteSettings.serverIp} onChange={(v) => updateSiteSettings({ serverIp: v })} />
                <CopyField label="Java edition port" value={siteSettings.javaPort} onChange={(v) => updateSiteSettings({ javaPort: v })} />
                <CopyField label="Bedrock UDP port" value={siteSettings.bedrockPort} onChange={(v) => updateSiteSettings({ bedrockPort: v })} />
                <CopyField label="Discord invite URL" value={siteSettings.discordUrl} onChange={(v) => updateSiteSettings({ discordUrl: v })} />
              </div>
            </SettingsCard>

            {/* 4. Visual FX */}
            <SettingsCard
              id="visual-fx"
              icon={<Sparkles className="w-4 h-4" />}
              title="Visual FX"
              subtitle="Client-side touches visitors see on the public site."
            >
              <div className="divide-y divide-white/[0.06]">
                <div className="flex items-center justify-between gap-4 py-3.5 first:pt-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-sm font-medium">Confetti on copy IP</div>
                      <div className="text-zinc-500 text-xs">Fires red &amp; white particles when visitors copy the server IP</div>
                    </div>
                  </div>
                  <PillSwitch
                    on={siteSettings.fxConfetti}
                    label="Toggle confetti effect"
                    onToggle={() => updateSiteSettings({ fxConfetti: !siteSettings.fxConfetti })}
                  />
                </div>
                <div className="flex items-center justify-between gap-4 py-3.5 last:pb-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-sm font-medium">Ambient glow</div>
                      <div className="text-zinc-500 text-xs">Pulsing red ambient glow in the Hero and page headers</div>
                    </div>
                  </div>
                  <PillSwitch
                    on={siteSettings.fxGlow}
                    label="Toggle ambient glow effect"
                    onToggle={() => updateSiteSettings({ fxGlow: !siteSettings.fxGlow })}
                  />
                </div>
              </div>
            </SettingsCard>

            {/* 5. Data */}
            <SettingsCard
              id="data"
              icon={<Database className="w-4 h-4" />}
              title="Backup & reset"
              subtitle="Export a snapshot of the current settings, or restore the factory defaults."
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(siteSettings, null, 2));
                    showToast("Settings copied", "JSON backup copied to clipboard");
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-200 text-xs font-medium transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Export JSON
                </button>
                <button
                  onClick={() => {
                    if (confirm("Reset all website settings to factory defaults?")) {
                      resetSiteSettings();
                      showToast("Reset complete", "Default site settings restored");
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 text-red-400 text-xs font-medium transition-colors cursor-pointer"
                >
                  Reset defaults
                </button>
              </div>
            </SettingsCard>

            {/* 6. Security */}
            <SettingsCard
              id="security"
              icon={<KeyRound className="w-4 h-4" />}
              title="Staff passcode"
              subtitle="Change the passcode used to sign in to this panel."
            >
              <form onSubmit={handleChangePassword} className="space-y-4 max-w-sm">
                  {changePasswordError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{changePasswordError}</span>
                    </div>
                  )}
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1.5">Current passcode</label>
                    <input
                      type="password"
                      value={currentPasscodeInput}
                      onChange={(e) => setCurrentPasscodeInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff2e2e]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1.5">New passcode</label>
                    <input
                      type="password"
                      value={newPasscodeInput}
                      onChange={(e) => setNewPasscodeInput(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff2e2e]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1.5">Confirm new passcode</label>
                    <input
                      type="password"
                      value={confirmPasscodeInput}
                      onChange={(e) => setConfirmPasscodeInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff2e2e]/60 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={changePasswordLoading}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#ff2e2e] hover:bg-[#ff4545] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    {changePasswordLoading ? "Updating..." : "Update passcode"}
                  </button>
                </form>
            </SettingsCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
