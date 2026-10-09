"use client";

import React, { useState } from "react";
import Link from "next/link";
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
    <footer className="bg-[#060608] border-t border-white/10 pt-20 pb-12 relative z-10 text-zinc-400 text-sm">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Col 1: Brand info */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link href="/#hero" className="flex items-center gap-3 mb-4 group">
              <div className="w-9 h-9 flex items-center justify-center">
                <svg
                  className="w-full h-full drop-shadow-[0_0_10px_rgba(255,46,46,0.45)]"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="20,2 38,11 38,29 20,38 2,29 2,11"
                    stroke="#ff2e2e"
                    strokeWidth="2.5"
                    fill="rgba(15, 23, 42, 0.85)"
                  />
                  <path
                    d="M15 15L25 25M25 15L15 25"
                    stroke="#ff2e2e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="20" cy="20" r="4" fill="#b91c1c" />
                </svg>
              </div>
              <span className="font-['Chakra_Petch'] text-2xl font-bold tracking-tight text-white leading-none">
                NEXCORE<span className="text-[#ff2e2e]">MC</span>
              </span>
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
              India&apos;s premier dedicated Minecraft multiplayer network. Low-latency Mumbai hosting, active competitive tournaments, and custom survival realms.
            </p>

            <div className="p-3.5 rounded-2xl bg-[#111115] border border-white/10 flex items-center justify-between gap-4 w-full max-w-xs shadow-md">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold font-['Chakra_Petch'] text-zinc-500 uppercase tracking-wider">
                  Server Address
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  nexcoremc.in
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="p-2 rounded-xl bg-[#181824] hover:bg-[#202030] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Copy Server Address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </motion.button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="font-['Chakra_Petch'] text-xs font-bold text-white uppercase tracking-wider mb-2">
              Navigation
            </h4>
            <Link href="/#hero" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/#modes" className="hover:text-white transition-colors">
              Game Modes
            </Link>
            <Link href="/#how-to-join" className="hover:text-white transition-colors">
              How to Join
            </Link>
            <Link href="/#features" className="hover:text-white transition-colors">
              Network Features
            </Link>
            <Link href="/#store" className="hover:text-white transition-colors">
              Store & Ranks
            </Link>
          </div>

          {/* Col 3: Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-['Chakra_Petch'] text-xs font-bold text-white uppercase tracking-wider mb-2">
              Legal & Rules
            </h4>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/#faq" className="hover:text-white transition-colors">
              Server Rules & FAQ
            </Link>
          </div>

          {/* Col 4: Community */}
          <div className="flex flex-col gap-3">
            <h4 className="font-['Chakra_Petch'] text-xs font-bold text-white uppercase tracking-wider mb-2">
              Community
            </h4>
            <a
              href="https://discord.gg/7e6vX6EgFt"
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
