"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink, ArrowRight, Server, Shield, Sparkles, Terminal } from "lucide-react";
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
      className="relative min-h-[92vh] pt-36 pb-24 flex flex-col items-center justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Dynamic Ambient Spotlights & Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-[#ff2e2e]/12 blur-[150px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-[#b91c1c]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full flex flex-col items-center text-center relative z-10">
        {/* Top Region Pill + Live Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 flex flex-wrap items-center justify-center gap-2.5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115]/90 border border-[#ff2e2e]/30 text-[#ff4545] text-xs font-bold font-['Chakra_Petch'] tracking-wider uppercase shadow-md shadow-black/40">
            <span className="w-2 h-2 rounded-full bg-[#ff2e2e] animate-ping" />
            <span>INDIA SERVER NETWORK</span>
          </div>
          <LiveStatusBadge />
        </motion.div>

        {/* Main Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="max-w-4xl font-['Plus_Jakarta_Sans'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
        >
          INDIA&apos;S PREMIER{" "}
          <span className="text-gradient-red block sm:inline">
            MINECRAFT NETWORK
          </span>
        </motion.h1>

        {/* Tagline / Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed mb-10"
        >
          Survival SMP, Bedwars, Practice PvP, and Custom Minigames hosted on
          dedicated low-latency Mumbai infrastructure with enterprise anti-cheat.
        </motion.p>

        {/* Masterclass Server IP Terminal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="w-full max-w-xl p-5 sm:p-6 rounded-2xl bg-[#111115]/95 border border-white/10 hover:border-[#ff2e2e]/45 backdrop-blur-2xl shadow-2xl shadow-black/90 mb-10 text-left relative group transition-all duration-300 hover:shadow-[#ff2e2e]/10"
        >
          {/* Top terminal bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] font-mono text-zinc-500 ml-2">
                nexcoremc.network.terminal
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              PORT 25565 / 25567
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold font-['Chakra_Petch'] text-zinc-400 tracking-wider uppercase mb-1">
                Server IP Address
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-wide selection:bg-[#ff2e2e]/40">
                nexcoremc.in
              </span>
              <span className="text-xs text-zinc-400 mt-1 font-mono">
                Supports Java (1.8 - 1.20+) & Bedrock / MCPE
              </span>
            </div>

            <div className="flex sm:flex-col gap-2 shrink-0">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyJava}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#ff2e2e] to-[#b91c1c] hover:from-[#ff4545] hover:to-[#dc2626] text-white text-xs font-bold font-['Chakra_Petch'] tracking-wide shadow-md shadow-[#ff2e2e]/25 transition-all cursor-pointer"
              >
                {copiedJava ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>COPIED JAVA</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-white/90" />
                    <span>COPY JAVA IP</span>
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyBedrock}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#181822] hover:bg-[#20202e] border border-white/10 text-zinc-200 text-xs font-bold font-['Chakra_Petch'] tracking-wide transition-all cursor-pointer"
              >
                {copiedBedrock ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>COPIED BEDROCK</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>BEDROCK: 25567</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="/#how-to-join"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ff2e2e] to-[#b91c1c] hover:from-[#ff4545] hover:to-[#dc2626] text-white font-['Chakra_Petch'] font-bold text-xs tracking-wider shadow-lg shadow-[#ff2e2e]/30 hover:shadow-[#ff2e2e]/50 transition-all duration-200"
          >
            <span>HOW TO JOIN</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="https://discord.gg/7e6vX6EgFt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#5865f2] hover:bg-[#4752c4] text-white font-['Chakra_Petch'] font-bold text-xs tracking-wider shadow-lg shadow-[#5865f2]/25 hover:shadow-[#5865f2]/40 transition-all duration-200"
          >
            <span>JOIN OFFICIAL DISCORD</span>
            <ExternalLink className="w-4 h-4 opacity-75" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
