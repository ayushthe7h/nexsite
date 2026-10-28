"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Flame,
  Info,
  CheckCircle2,
  X,
  ExternalLink,
  Lock,
  Unlock,
  Radio,
  Clock,
  ArrowRight,
  ShieldAlert,
  Server
} from "lucide-react";
import { useSiteSettings } from "@/components/providers/SiteSettingsContext";
import { useServerStatus } from "@/lib/useServerStatus";

export function SiteOverlay() {
  const { settings, staffBypassed, setStaffBypassed } = useSiteSettings();
  const status = useServerStatus();
  const pathname = usePathname();

  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [showBypassModal, setShowBypassModal] = useState(false);
  const [bypassPasscode, setBypassPasscode] = useState("");
  const [bypassError, setBypassError] = useState("");

  const handleBypassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bypassPasscode === "admin123" || bypassPasscode === "nexcore2026") {
      setStaffBypassed(true);
      setShowBypassModal(false);
      setBypassError("");
    } else {
      setBypassError("Invalid staff passcode.");
    }
  };

  // If on /panel, never lock the user out so they can always manage settings!
  const isPanelRoute = pathname === "/panel";

  // Check if full maintenance screen should be displayed
  const isMaintenanceActive = settings.maintenanceMode && !staffBypassed && !isPanelRoute;

  return (
    <>
      {/* 1. Global Top Announcement Banner */}
      {settings.topBannerEnabled && !bannerDismissed && !isMaintenanceActive && (
        <div
          className={`w-full text-xs py-2 px-4 border-b z-50 relative flex items-center justify-between gap-4 select-none ${
            settings.topBannerType === "urgent"
              ? "bg-red-950/95 border-red-500/40 text-red-200"
              : settings.topBannerType === "event"
              ? "bg-gradient-to-r from-purple-950/95 via-[#1a1228] to-purple-950/95 border-purple-500/40 text-purple-200"
              : settings.topBannerType === "success"
              ? "bg-emerald-950/95 border-emerald-500/40 text-emerald-200"
              : "bg-blue-950/95 border-blue-500/40 text-blue-200"
          }`}
        >
          <div className="max-w-[1240px] mx-auto flex items-center justify-center gap-2 flex-1 text-center font-medium">
            {settings.topBannerType === "urgent" ? (
              <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
            ) : settings.topBannerType === "event" ? (
              <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            ) : settings.topBannerType === "success" ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            )}

            <span>{settings.topBannerText}</span>

            {settings.topBannerLink && (
              <a
                href={settings.topBannerLink}
                target={settings.topBannerLink.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="underline hover:text-white font-bold ml-1 inline-flex items-center gap-0.5"
              >
                <span>Learn More</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <button
            onClick={() => setBannerDismissed(true)}
            className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Full Site Maintenance Screen Overlay */}
      {isMaintenanceActive && (
        <div className="fixed inset-0 z-[100] bg-[#09090b] text-[#f4f4f6] flex flex-col items-center justify-center p-6 overflow-y-auto">
          {/* Ambient Lighting */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl text-center relative z-10 p-8 sm:p-12 rounded-3xl bg-[#111115]/95 border border-amber-500/30 shadow-2xl shadow-black/80"
          >
            {/* Logo with Maintenance Aura */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full pointer-events-none -z-10" />
              <Image
                src="/logo.png"
                alt="NexCore MC"
                width={160}
                height={160}
                className="w-32 h-32 sm:w-40 sm:h-40 object-contain mx-auto drop-shadow-2xl"
                priority
              />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold font-['Chakra_Petch'] tracking-wider uppercase mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>MAINTENANCE MODE ACTIVE</span>
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              We&apos;ll Be Back Shortly!
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 max-w-lg mx-auto">
              {settings.maintenanceMessage}
            </p>

            {/* ETA Info Box */}
            <div className="p-4 rounded-2xl bg-[#161622] border border-white/10 flex items-center justify-center gap-6 mb-8 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Estimated Completion: <strong className="text-white">{settings.maintenanceEta}</strong></span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <span>Server IP: <strong className="text-white">{settings.serverIp}</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={settings.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs font-bold font-['Chakra_Petch'] tracking-wide flex items-center gap-2 shadow-lg shadow-[#5865f2]/25 transition-all"
              >
                <span>JOIN DISCORD FOR UPDATES</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <Link
                href="/uptime"
                className="px-6 py-3 rounded-xl bg-[#181822] hover:bg-[#202030] border border-white/10 text-white text-xs font-bold font-['Chakra_Petch'] tracking-wide transition-all"
              >
                <span>CHECK UPTIME STATUS</span>
              </Link>

              {settings.allowStaffBypass && (
                <button
                  onClick={() => setShowBypassModal(true)}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white text-xs font-bold font-['Chakra_Petch'] tracking-wide transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>STAFF BYPASS</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Staff Bypass Modal */}
          <AnimatePresence>
            {showBypassModal && (
              <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-sm p-6 rounded-2xl bg-[#111115] border border-white/15 shadow-2xl text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#ff2e2e]/10 border border-[#ff2e2e]/30 flex items-center justify-center mx-auto mb-4 text-[#ff2e2e]">
                    <Unlock className="w-6 h-6" />
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-white mb-1">
                    Staff Maintenance Bypass
                  </h3>
                  <p className="text-zinc-400 text-xs mb-4">
                    Enter the authorized passcode to browse the site during maintenance.
                  </p>

                  {bypassError && (
                    <div className="mb-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                      {bypassError}
                    </div>
                  )}

                  <form onSubmit={handleBypassSubmit} className="space-y-3">
                    <input
                      type="password"
                      placeholder="Enter Staff Passcode"
                      value={bypassPasscode}
                      onChange={(e) => setBypassPasscode(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#161622] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#ff2e2e]"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowBypassModal(false)}
                        className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold font-['Chakra_Petch'] cursor-pointer"
                      >
                        CANCEL
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-xl bg-[#ff2e2e] hover:bg-[#ff4545] text-white text-xs font-bold font-['Chakra_Petch'] cursor-pointer"
                      >
                        UNLOCK
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
