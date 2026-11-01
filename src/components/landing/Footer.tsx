"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useToastNotification } from "./ToastContext";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToastNotification();

  const handleCopy = () => {
    navigator.clipboard.writeText("nexcoremc.in");
    setCopied(true);
    showToast("Server IP copied", "nexcoremc.in (Port: 25565 Java / 25567 Bedrock)");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#09090b] border-t border-white/[0.08] pt-20 pb-12 relative z-10 text-zinc-400 text-sm">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Col 1: Brand info */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="NexCore MC"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(255,46,46,0.5)] group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="font-['Chakra_Petch'] text-2xl font-bold tracking-tight text-white leading-none">
                NEXCORE<span className="text-[#ff2e2e]">MC</span>
              </span>
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
              India&apos;s premier dedicated Minecraft multiplayer network. Low-latency Mumbai hosting, active competitive tournaments, and custom survival realms.
            </p>

            <div className="rounded-2xl bg-[#111114]/90 border border-white/[0.08] p-3.5 flex items-center justify-between gap-4 w-full max-w-xs">
              <div className="flex flex-col">
                <span className="text-[11px] text-zinc-500 mb-1">
                  Server address
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  nexcoremc.in
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white cursor-pointer transition-colors"
                title="Copy server address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-white mb-1">
              Navigation
            </h4>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/modes" className="hover:text-white transition-colors">
              Game modes
            </Link>
            <Link href="/how-to-join" className="hover:text-white transition-colors">
              How to join
            </Link>
            <Link href="/features" className="hover:text-white transition-colors">
              Network features
            </Link>
            <Link href="/store" className="hover:text-white transition-colors">
              Store & ranks
            </Link>
            <Link href="/uptime" className="hover:text-white transition-colors">
              Network status & uptime
            </Link>
            <Link href="/panel" className="hover:text-white transition-colors">
              Staff control panel
            </Link>
          </div>

          {/* Col 3: Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-white mb-1">
              Legal & rules
            </h4>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & conditions
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              Server rules & FAQ
            </Link>
          </div>

          {/* Col 4: Community */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-white mb-1">
              Community
            </h4>
            <a
              href="https://discord.gg/nexcoremc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#818cf8] transition-colors flex items-center gap-1.5"
            >
              <span>Discord server</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; 2026 NexCoreMC Network. All rights reserved.
          </div>
          <div className="text-center md:text-right max-w-md text-[11px] leading-relaxed font-mono">
            Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
          </div>
        </div>
      </div>
    </footer>
  );
}
