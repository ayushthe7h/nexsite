"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Check, Bell, Shield, Users } from "lucide-react";

export function DiscordBanner() {
  const perks = [
    "Server Announcements & Maintenance Updates",
    "Tournament Registrations & Prize Pools",
    "Staff Ticket Support & Ban Appeals",
    "Community Text, Voice & LFG Channels",
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative rounded-3xl bg-gradient-to-br from-[#181a28] via-[#11121c] to-[#0c0d14] border border-[#5865f2]/35 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-[#5865f2]/10"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#5865f2]/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5865f2]/15 border border-[#5865f2]/30 text-[#818cf8] text-xs font-bold font-['Chakra_Petch'] tracking-wider uppercase mb-5 shadow-sm">
                OFFICIAL COMMUNITY
              </div>

              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                JOIN THE <span className="text-[#818cf8]">NEXCORE DISCORD</span> FOR EVENTS & SUPPORT
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                Connect with players, find teammates for Bedwars & SMP, view scheduled tournaments, and submit support tickets directly to our staff.
              </p>

              {/* Perks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8 w-full">
                {perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="https://discord.gg/7e6vX6EgFt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#5865f2] hover:bg-[#4752c4] text-white font-['Chakra_Petch'] font-bold text-xs tracking-wider shadow-lg shadow-[#5865f2]/30 hover:shadow-[#5865f2]/50 transition-all duration-200"
              >
                <span>JOIN DISCORD SERVER</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>

            {/* Right Interactive Mockup / Stats Card */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#131422]/95 border border-white/10 backdrop-blur-2xl shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5865f2] flex items-center justify-center text-white font-bold font-['Chakra_Petch'] text-lg shadow-md shadow-[#5865f2]/30">
                      N
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">NexCoreMC Network</div>
                      <div className="text-xs text-zinc-400 font-mono">discord.gg/7e6vX6EgFt</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold font-['Chakra_Petch'] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>COMMUNITY LIVE</span>
                  </span>
                </div>

                <div className="space-y-3 text-xs text-zinc-300">
                  <div className="p-3.5 rounded-xl bg-[#1a1b2e] border border-white/5 flex items-center gap-3">
                    <Bell className="w-4 h-4 text-[#818cf8] shrink-0" />
                    <span>Instant announcements for realm updates and maintenance</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#1a1b2e] border border-white/5 flex items-center gap-3">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct 1-on-1 staff ticket resolution</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#1a1b2e] border border-white/5 flex items-center gap-3">
                    <Users className="w-4 h-4 text-[#ff2e2e] shrink-0" />
                    <span>LFG matchmaking lobbies & tournament scrims</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
