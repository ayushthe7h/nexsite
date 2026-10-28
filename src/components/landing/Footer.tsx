"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useToastNotification } from "./ToastContext";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToastNotification();

  const handleCopy = () => {
    navigator.clipboard.writeText("nexcoremc.in");
    setCopied(true);
    showToast("Server IP Copied!", "nexcoremc.in (Port: 25565 Java / 25567 Bedrock)");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#060503] border-t-2 border-[#ff2e2e]/20 pt-20 pb-12 relative z-10 text-zinc-400 text-sm bg-pixel-noise">
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
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <span className="font-['Chakra_Petch'] text-2xl font-bold tracking-tight text-white leading-none">
                NEXCORE<span className="text-[#ff2e2e]">MC</span>
              </span>
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
              India&apos;s premier dedicated Minecraft multiplayer network. Low-latency Mumbai hosting, active competitive tournaments, and custom survival realms.
            </p>

            <div className="mc-panel p-3.5 bg-[#1a120f] flex items-center justify-between gap-4 w-full max-w-xs">
              <div className="flex flex-col">
                <span className="text-[9px] font-pixel text-zinc-500 uppercase tracking-wide mb-1">
                  Server Address
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  nexcoremc.in
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="mc-btn p-2 bg-[#241a15] hover:bg-[#2c1f18] text-zinc-300 hover:text-white cursor-pointer"
                title="Copy Server Address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="font-pixel text-[10px] text-[#ff4545] uppercase tracking-wide mb-2">
              Navigation
            </h4>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/modes" className="hover:text-white transition-colors">
              Game Modes
            </Link>
            <Link href="/how-to-join" className="hover:text-white transition-colors">
              How to Join
            </Link>
            <Link href="/features" className="hover:text-white transition-colors">
              Network Features
            </Link>
            <Link href="/store" className="hover:text-white transition-colors">
              Store & Ranks
            </Link>
            <Link href="/uptime" className="hover:text-white transition-colors">
              Network Status & Uptime
            </Link>
            <Link href="/panel" className="hover:text-white transition-colors">
              Staff Control Panel
            </Link>
          </div>

          {/* Col 3: Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-pixel text-[10px] text-[#ff4545] uppercase tracking-wide mb-2">
              Legal & Rules
            </h4>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              Server Rules & FAQ
            </Link>
          </div>

          {/* Col 4: Community */}
          <div className="flex flex-col gap-3">
            <h4 className="font-pixel text-[10px] text-[#ff4545] uppercase tracking-wide mb-2">
              Community
            </h4>
            <a
              href="https://discord.gg/nexcoremc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#818cf8] transition-colors flex items-center gap-1.5"
            >
              <span>Discord Server</span>
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
