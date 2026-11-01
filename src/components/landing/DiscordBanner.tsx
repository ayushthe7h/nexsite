"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Check, Bell, Shield, Users } from "lucide-react";

export function DiscordBanner() {
  const perks = [
    "Server announcements & maintenance updates",
    "Tournament registrations & prize pools",
    "Staff ticket support & ban appeals",
    "Community text, voice & LFG channels",
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-3xl relative bg-[#111114]/90 border border-white/[0.08] p-8 sm:p-12 lg:p-16 overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#5865f2]/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="rounded-full inline-flex items-center gap-2 px-3.5 py-2 bg-[#5865f2]/15 border border-[#5865f2]/25 text-[#818cf8] text-sm font-medium mb-5">
                Official community
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                Join the <span className="text-[#818cf8]">NexCore Discord</span>
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                Connect with players, find teammates for Bedwars & SMP, view scheduled tournaments, and submit support tickets directly to our staff.
              </p>

              {/* Perks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8 w-full">
                {perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                    <span className="rounded-full w-5 h-5 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://discord.gg/nexcoremc"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full inline-flex items-center gap-3 px-7 py-3.5 bg-[#5865f2] hover:bg-[#4752c4] text-white font-semibold text-sm transition-colors"
              >
                <span>Join Discord server</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Right Interactive Mockup / Stats Card */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="rounded-2xl bg-[#111114]/90 border border-white/[0.08] p-6 sm:p-7">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full w-10 h-10 bg-[#5865f2] flex items-center justify-center text-white font-heading font-bold text-sm">
                      N
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">NexCoreMC Network</div>
                      <div className="text-xs text-zinc-400 font-mono">discord.gg/nexcoremc</div>
                    </div>
                  </div>
                  <span className="rounded-full text-xs font-medium px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live</span>
                  </span>
                </div>

                <div className="space-y-3 text-xs text-zinc-300">
                  <div className="rounded-xl p-3.5 bg-white/[0.04] border border-white/[0.08] flex items-center gap-3">
                    <Bell className="w-4 h-4 text-[#818cf8] shrink-0" />
                    <span>Instant announcements for realm updates and maintenance</span>
                  </div>
                  <div className="rounded-xl p-3.5 bg-white/[0.04] border border-white/[0.08] flex items-center gap-3">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct 1-on-1 staff ticket resolution</span>
                  </div>
                  <div className="rounded-xl p-3.5 bg-white/[0.04] border border-white/[0.08] flex items-center gap-3">
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
