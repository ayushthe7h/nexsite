"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Wind,
  Feather,
  Home,
  Package,
  Key,
  ExternalLink,
  Trophy,
  Clock,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useToastNotification } from "./ToastContext";

const VOTE_URL = "https://minecraft-mp.com/server/363270/vote/";

const REWARDS = [
  { icon: Feather, label: "/cfly", desc: "Creative-style flight, unlocked" },
  { icon: Wind, label: "/tfly", desc: "Toggleable flight command" },
  { icon: Home, label: "+1 Extra Home", desc: "One more /sethome slot" },
  { icon: Package, label: "+1 Extra Vault", desc: "One more vault page" },
  { icon: Key, label: "1 Vote Key", desc: "Opens the Vote Crate" },
];

const STEPS = [
  {
    icon: MousePointerClick,
    title: "Click vote now",
    desc: "Opens Minecraft-MP in a new tab — no download, no sign-up.",
  },
  {
    icon: ShieldCheck,
    title: "Vote for NexCoreMC",
    desc: "Clear the quick captcha so the vote counts for your IGN.",
  },
  {
    icon: Sparkles,
    title: "Claim in-game",
    desc: "Rewards apply automatically within minutes while you're online.",
  },
];

export function Vote() {
  const { showToast } = useToastNotification();

  const handleVoteClick = () => {
    showToast("Heading to Minecraft-MP", "Come back and vote again in 24 hours!");
  };

  return (
    <section className="py-16 lg:py-20 relative z-10">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        {/* Rewards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-14"
        >
          {REWARDS.map((reward) => (
            <div
              key={reward.label}
              className="rounded-2xl bg-[#111114]/90 border border-white/[0.08] p-5 hover:bg-white/[0.04] transition-colors text-center flex flex-col items-center gap-2.5 group"
            >
              <div className="rounded-xl w-12 h-12 bg-[#ff2e2e]/10 border border-[#ff2e2e]/20 flex items-center justify-center text-[#ff4545] group-hover:scale-105 transition-transform">
                <reward.icon className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-white text-sm sm:text-[15px]">
                {reward.label}
              </span>
              <span className="text-[11px] text-zinc-500 leading-snug">{reward.desc}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl relative bg-[#111114]/90 border border-white/[0.08] p-8 sm:p-12 text-center overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#ff2e2e]/15 blur-[90px] rounded-full pointer-events-none" />

          <div className="rounded-full w-14 h-14 bg-[#ff2e2e]/10 border border-[#ff2e2e]/20 flex items-center justify-center mx-auto mb-5 text-[#ff2e2e]">
            <Trophy className="w-7 h-7" />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
            Vote, unlock rewards.<br /><span className="text-[#ff4545]">Repeat every 24 hours.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-7">
            One click, no download — vote for NexCoreMC on Minecraft-MP and your rewards land in-game automatically.
          </p>

          <a
            href={VOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleVoteClick}
            className="rounded-full inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#ff2e2e] hover:bg-[#ff4545] text-white font-semibold text-sm cursor-pointer transition-colors"
          >
            <span>Vote now on Minecraft-MP</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 mt-4">
            <Clock className="w-3.5 h-3.5" />
            <span>You can vote once every 24 hours per Minecraft-MP account.</span>
          </div>
        </motion.div>

        {/* How it works */}
        <div className="grid sm:grid-cols-3 gap-5 mt-14">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl bg-[#111114]/70 border border-white/[0.08] p-6 relative"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-lg w-9 h-9 bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#ff4545] shrink-0">
                  <step.icon className="w-4 h-4" />
                </div>
                <span className="text-xs text-zinc-500">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="font-heading font-bold text-white text-base mb-1.5">
                {step.title}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-zinc-500 text-[11px] mt-10 font-mono">
          Rewards are delivered by the Minecraft-MP voting plugin on the server — make sure you&apos;re online in-game to receive them instantly.
        </p>
      </div>
    </section>
  );
}
