"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldAlert, Coins, Trophy, Sparkles, Headphones } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Mumbai Ultra-Low Latency",
      desc: "Hosted on Tier-4 Indian datacenter infrastructure ensuring crisp 10-20ms ping for Indian players and sub-50ms across South Asia.",
    },
    {
      icon: ShieldAlert,
      title: "Enterprise Anti-Cheat Engine",
      desc: "Custom detection engine analyzing combat patterns, movement mechanics, and packet validation in real time for 100% fair competitive play.",
    },
    {
      icon: Coins,
      title: "Player-Driven Balanced Economy",
      desc: "Zero pay-to-win mechanics. Fair chest shops, player warps, auction house, and community marketplace designed for player trading.",
    },
    {
      icon: Trophy,
      title: "Scheduled Cash & Rank Tournaments",
      desc: "Monthly competitive Bedwars & Practice tournaments with real rewards, custom trophy tags, and live streamed finals.",
    },
    {
      icon: Sparkles,
      title: "Custom Vanilla+ Optimizations",
      desc: "Enhanced performance engine maintaining consistent 20.0 TPS with custom land claims, vein miner QoL, and responsive bridging.",
    },
    {
      icon: Headphones,
      title: "24/7 Dedicated Support Desk",
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
          <div className="mc-outline inline-flex items-center gap-2 px-3.5 py-2 bg-[#ff2e2e]/10 text-[#ff4545] text-[9px] font-pixel tracking-wide uppercase mb-5">
            Network Advantages
          </div>
          <h2 className="font-pixel text-lg sm:text-2xl text-white leading-[1.8] mb-4">
            WHY PLAY ON <span className="text-[#ff4545]">NEXCOREMC</span>
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
                className="mc-panel group relative p-7 bg-[#1a120f] hover:bg-[#201712] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="mc-outline w-12 h-12 bg-[#ff2e2e]/10 flex items-center justify-center text-[#ff2e2e] mb-6 group-hover:bg-[#ff2e2e]/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-white mb-3 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#ff2e2e]" />
                    <span>Verified Infrastructure</span>
                  </div>
                  <span className="text-[9px] text-zinc-600 font-pixel">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
