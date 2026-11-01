"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldAlert, Coins, Trophy, Sparkles, Headphones } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Mumbai ultra-low latency",
      desc: "Hosted on Tier-4 Indian datacenter infrastructure ensuring crisp 10-20ms ping for Indian players and sub-50ms across South Asia.",
    },
    {
      icon: ShieldAlert,
      title: "Enterprise anti-cheat engine",
      desc: "Custom detection engine analyzing combat patterns, movement mechanics, and packet validation in real time for 100% fair competitive play.",
    },
    {
      icon: Coins,
      title: "Player-driven balanced economy",
      desc: "Zero pay-to-win mechanics. Fair chest shops, player warps, auction house, and community marketplace designed for player trading.",
    },
    {
      icon: Trophy,
      title: "Scheduled cash & rank tournaments",
      desc: "Monthly competitive Bedwars & Practice tournaments with real rewards, custom trophy tags, and live streamed finals.",
    },
    {
      icon: Sparkles,
      title: "Custom vanilla+ optimizations",
      desc: "Enhanced performance engine maintaining consistent 20.0 TPS with custom land claims, vein miner QoL, and responsive bridging.",
    },
    {
      icon: Headphones,
      title: "24/7 dedicated support desk",
      desc: "Active moderation team and automated Discord ticket desk ready to resolve inquiries, rule violations, and account requests.",
    },
  ];

  return (
    <section id="features" className="py-28 lg:py-32 relative z-10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="rounded-full inline-flex items-center gap-2 px-3.5 py-2 bg-[#ff2e2e]/10 border border-[#ff2e2e]/20 text-[#ff4545] text-sm font-medium mb-5">
            Network advantages
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Why play on <span className="text-[#ff4545]">NexCoreMC</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Built by competitive Minecraft veterans for gamers who demand high performance, fair play, and an active community.
          </p>
        </motion.div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                className="rounded-2xl bg-[#111114]/90 border border-white/[0.08] group relative p-7 hover:bg-white/[0.04] transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="rounded-xl w-12 h-12 bg-[#ff2e2e]/10 border border-[#ff2e2e]/20 flex items-center justify-center text-[#ff2e2e] mb-6 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white mb-3 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff2e2e]" />
                  <span>Verified infrastructure</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
