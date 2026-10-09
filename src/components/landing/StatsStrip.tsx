"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Server, Layers } from "lucide-react";

export function StatsStrip() {
  const stats = [
    {
      icon: Zap,
      value: "10-20ms",
      label: "Mumbai Low-Latency",
      description: "Dedicated Tier-4 Indian routing",
    },
    {
      icon: ShieldCheck,
      value: "Enterprise",
      label: "Anti-Cheat Engine",
      description: "Active heuristic exploit blocking",
    },
    {
      icon: Server,
      value: "99.9%",
      label: "Network Uptime",
      description: "Automated failover redundancy",
    },
    {
      icon: Layers,
      value: "5 Realms",
      label: "Custom Game Modes",
      description: "Survival, Bedwars, Practice & more",
    },
  ];

  return (
    <section className="relative z-10 -mt-6 max-w-[1240px] mx-auto px-4 sm:px-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-[#111115]/95 border border-white/10 backdrop-blur-xl hover:border-[#ff2e2e]/40 hover:bg-[#15151c] transition-all duration-300 group shadow-lg shadow-black/40"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#ff2e2e]/10 border border-[#ff2e2e]/25 flex items-center justify-center text-[#ff2e2e] shrink-0 group-hover:scale-110 group-hover:bg-[#ff2e2e]/20 group-hover:border-[#ff2e2e]/50 transition-all duration-300 shadow-sm shadow-[#ff2e2e]/15">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <div className="text-xl sm:text-2xl font-extrabold font-['Chakra_Petch'] text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold font-['Chakra_Petch'] text-zinc-300 uppercase tracking-wide">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5 font-mono">
                    {stat.description}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
