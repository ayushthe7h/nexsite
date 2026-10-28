"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink, ArrowRight, Swords, Play } from "lucide-react";
import { LiveStatusBadge } from "./LiveStatusBadge";
import { useToastNotification } from "./ToastContext";
import confetti from "canvas-confetti";

export function Hero() {
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrock, setCopiedBedrock] = useState(false);
  const { showToast } = useToastNotification();

  const handleCopyJava = () => {
    navigator.clipboard.writeText("nexcoremc.in");
    setCopiedJava(true);
    showToast("Java Server IP Copied!", "nexcoremc.in (Default Port: 25565)");

    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#ff2e2e", "#b91c1c", "#ffffff"],
    });

    setTimeout(() => setCopiedJava(false), 2000);
  };

  const handleCopyBedrock = () => {
    navigator.clipboard.writeText("nexcoremc.in:25567");
    setCopiedBedrock(true);
    showToast("Bedrock Server Details Copied!", "IP: nexcoremc.in | Port: 25567");

    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#ff2e2e", "#b91c1c", "#ffffff"],
    });

    setTimeout(() => setCopiedBedrock(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-104px)] pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-pixel-grid"
    >
      {/* Dynamic Ambient Spotlights & Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-[#ff2e2e]/14 blur-[160px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-[#b91c1c]/12 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full flex flex-col items-center text-center relative z-10">
        {/* Top Region Pill + Live Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-7 flex flex-wrap items-center justify-center gap-2.5"
        >
          <div className="mc-outline inline-flex items-center gap-2 px-3.5 py-2 bg-[#1a120f] text-[#ff4545] text-[10px] font-pixel tracking-wide uppercase">
            <span className="w-2 h-2 bg-[#ff2e2e] animate-pulse" />
            <span>India Server Network</span>
          </div>
          <LiveStatusBadge />
        </motion.div>

        {/* Official NexCore MC 3D Planet Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6 group"
        >
          <div className="absolute inset-0 bg-[#ff2e2e]/25 blur-3xl rounded-full pointer-events-none -z-10 group-hover:bg-[#ff2e2e]/40 transition-all duration-500" />
          <Image
            src="/logo.png"
            alt="NexCore MC Official Logo"
            width={240}
            height={240}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain drop-shadow-[0_12px_40px_rgba(255,46,46,0.45)] hover:scale-105 transition-transform duration-300 mx-auto select-none"
            priority
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>

        {/* Main Hero Headline - the one bold pixel-font moment on the page */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="max-w-4xl font-pixel text-xl sm:text-3xl md:text-4xl font-normal tracking-tight text-white leading-[1.6] mb-6"
        >
          INDIA&apos;S PREMIER
          <br />
          <span className="text-[#ff4545]">MINECRAFT NETWORK</span>
        </motion.h1>

        {/* Tagline / Subtitle - stays in the readable sans so the page
            doesn't force pixel-font onto long-form reading text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed mb-9"
        >
          Survival SMP, Competitive Bedwars, Practice PvP, and Custom Minigames hosted on
          dedicated low-latency Mumbai infrastructure with enterprise anti-cheat.
        </motion.p>

        {/* Server IP Panel - built as a Minecraft inventory-style panel:
            sunken "screen" for the IP readout, raised pixel buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mc-panel w-full max-w-xl p-5 sm:p-6 bg-[#1a120f] mb-9 text-left relative"
        >
          {/* Top terminal bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-red-500/80" />
              <div className="w-2.5 h-2.5 bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 bg-emerald-500/80" />
              <span className="text-[11px] font-mono text-zinc-500 ml-2">
                nexcoremc.network.terminal
              </span>
            </div>
            <span className="text-[10px] font-pixel text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-1 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
              25565 / 25567
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="mc-panel-sunken flex flex-col px-4 py-3 bg-black/40">
              <span className="text-[10px] font-pixel text-zinc-400 uppercase mb-1.5">
                Server IP
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-wide selection:bg-[#ff2e2e]/40">
                nexcoremc.in
              </span>
              <span className="text-xs text-zinc-400 mt-1.5 font-mono">
                Java (1.8 - 1.20+) & Bedrock / MCPE
              </span>
            </div>

            <div className="flex sm:flex-col gap-2.5 shrink-0">
              <button
                onClick={handleCopyJava}
                className="mc-btn flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#ff2e2e] to-[#b91c1c] hover:from-[#ff4545] hover:to-[#dc2626] text-white text-[10px] font-pixel cursor-pointer"
              >
                {copiedJava ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-white/90" />
                    <span>COPY JAVA IP</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyBedrock}
                className="mc-btn flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#241a15] hover:bg-[#2c1f18] text-zinc-200 text-[10px] font-pixel cursor-pointer"
              >
                {copiedBedrock ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>BEDROCK: 25567</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons Linking to Separate Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/how-to-join"
            className="mc-btn inline-flex items-center gap-2.5 px-6 py-4 bg-gradient-to-r from-[#ff2e2e] to-[#b91c1c] hover:from-[#ff4545] hover:to-[#dc2626] text-white font-pixel text-[10px]"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>HOW TO JOIN</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/modes"
            className="mc-btn inline-flex items-center gap-2.5 px-6 py-4 bg-[#1a120f] hover:bg-[#241a15] text-white font-pixel text-[10px]"
          >
            <Swords className="w-4 h-4 text-[#ff2e2e]" />
            <span>GAME MODES</span>
          </Link>

          <a
            href="https://discord.gg/nexcoremc"
            target="_blank"
            rel="noopener noreferrer"
            className="mc-btn inline-flex items-center gap-2.5 px-6 py-4 bg-[#5865f2] hover:bg-[#4752c4] text-white font-pixel text-[10px]"
          >
            <span>DISCORD</span>
            <ExternalLink className="w-4 h-4 opacity-75" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
