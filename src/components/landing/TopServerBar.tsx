"use client";

import React, { useState } from "react";
import { Copy, Check, Users, ExternalLink } from "lucide-react";
import { useServerStatus } from "@/lib/useServerStatus";
import { useSiteSettings } from "@/components/providers/SiteSettingsContext";
import { useToastNotification } from "./ToastContext";
import confetti from "canvas-confetti";

export function TopServerBar() {
  const status = useServerStatus();
  const { settings } = useSiteSettings();
  const [copied, setCopied] = useState(false);
  const { showToast } = useToastNotification();

  const handleCopyIP = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(settings.serverIp);
    setCopied(true);
    showToast("Server IP copied", `${settings.serverIp} (Java: ${settings.javaPort} / Bedrock: ${settings.bedrockPort})`);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.05, x: 0.5 },
      colors: ["#ff2e2e", "#22c55e", "#ffffff"],
    });

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#0a0a0c] border-b border-white/[0.06] text-xs text-zinc-300 py-1.5 px-3 sm:px-6 z-50 select-none relative">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        {/* Left: Server Status Indicator & IP with copy */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Live pulsing online badge */}
          <div
            className="rounded-full flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[11px] font-medium"
            title="Live server status"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{status.online ? "Online" : "Ready"}</span>
          </div>

          {/* Click to copy IP button */}
          <button
            onClick={handleCopyIP}
            className="rounded-full group inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] transition-colors cursor-pointer"
            title="Click to copy server IP address"
          >
            <span className="text-[11px] text-zinc-500">
              IP:
            </span>
            <span className="font-mono font-semibold text-white group-hover:text-[#ff4545] transition-colors">
              {settings.serverIp}
            </span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
            ) : (
              <Copy className="w-3 h-3 text-zinc-400 group-hover:text-white shrink-0 transition-colors" />
            )}
            {copied && (
              <span className="text-[11px] text-emerald-400">
                Copied
              </span>
            )}
          </button>

          {/* Real-time Players Count (Online and Max) */}
          <div className="rounded-full flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] border border-white/[0.06]">
            <Users className="w-3 h-3 text-[#ff4545]" />
            <span className="font-mono font-semibold text-white">
              {status.onlinePlayers}
            </span>
            <span className="text-zinc-600 font-mono">/</span>
            <span className="font-mono text-zinc-400">
              {status.maxPlayers}
            </span>
            <span className="text-[11px] text-zinc-500 ml-0.5 hidden xs:inline">
              online
            </span>
          </div>
        </div>

        {/* Right: Ports & Discord info */}
        <div className="hidden sm:flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>Java: {settings.javaPort}</span>
            <span className="text-zinc-700">|</span>
            <span>Bedrock: {settings.bedrockPort}</span>
          </div>

          <span className="text-zinc-700">•</span>

          <a
            href={settings.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-[#5865f2] transition-colors"
          >
            <span>discord.gg/nexcoremc</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
}
