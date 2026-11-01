"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swords, Compass, Flame, Target, ChevronRight, Check, Gamepad2, type LucideIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface GameMode {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  icon: LucideIcon;
  image: string;
  description: string;
  features: string[];
  version: string;
  playerCapacity: string;
  isWide?: boolean;
}

export function GameModes() {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

  const gameModes: GameMode[] = [
    {
      id: "survival",
      title: "Survival SMP",
      badge: "Most popular",
      badgeColor: "bg-[#ff2e2e]/15 text-[#ff4545]",
      icon: Compass,
      image: "/assets/survival.jpg",
      description:
        "Classic survival elevated with custom player economy, golden shovel land claims, custom enchantments, player warps, and community boss dungeons.",
      features: [
        "Grief prevention & land claims",
        "Player warps & player-driven economy",
        "Custom dungeons & boss spawns",
        "Auction house & chest shops",
      ],
      version: "1.20.x compatible",
      playerCapacity: "Dedicated SMP realm",
    },
    {
      id: "bedwars",
      title: "Competitive Bedwars",
      badge: "Esports focus",
      badgeColor: "bg-blue-500/15 text-blue-400",
      icon: Swords,
      image: "/assets/bedwars.jpg",
      description:
        "Fast-paced tactical bed protection with refined generator speeds, smooth bridging mechanics, custom shop balancing, and monthly competitive tournaments.",
      features: [
        "Solo, doubles, 3v3v3v3 & 4v4v4v4 modes",
        "Responsive hit registration & fast bridging",
        "Ranked Elo & monthly trophy ladders",
        "Cosmetic kill effects & win celebrations",
      ],
      version: "1.8 - 1.20+ seamless",
      playerCapacity: "Instant matchmaking",
    },
    {
      id: "practice",
      title: "Practice PvP",
      badge: "Ranked ladder",
      badgeColor: "bg-emerald-500/15 text-emerald-400",
      icon: Target,
      image: "/assets/survival.jpg",
      description:
        "High-performance 1v1 and team duels featuring NoDebuff, Boxing, Classic, Combo, GApple, and custom kits with pristine knockback profiles.",
      features: [
        "Optimized knockback & hit detection",
        "Ranked & unranked match queues",
        "Post-match damage analytics",
        "Custom kit editor & FFA arenas",
      ],
      version: "1.8.9 combat mechanics",
      playerCapacity: "Global leaderboards",
    },
    {
      id: "parkour",
      title: "Parkour realms",
      badge: "Skill & speed",
      badgeColor: "bg-amber-500/15 text-amber-400",
      icon: Flame,
      image: "/assets/bedwars.jpg",
      description:
        "Precision jump courses spanning from beginner courses to elite master runs. Features millisecond time tracking, ghost replays, and checkpoint portals.",
      features: [
        "50+ linear & open jump courses",
        "Millisecond precision timer",
        "Checkpoint persistence & quick reset",
        "Speedrun leaderboard trophies",
      ],
      version: "Universal support",
      playerCapacity: "Single & multiplayer",
    },
    {
      id: "minigames",
      title: "Mini-games hub",
      badge: "Party games",
      badgeColor: "bg-rose-500/15 text-rose-400",
      icon: Gamepad2,
      image: "/assets/hero_bg.jpg",
      description:
        "Fast-paced party games including The Bridge, SkyWars, and Wool Wars - quick rounds, easy to jump into with friends.",
      features: [
        "The Bridge (1v1 & 2v2)",
        "Fast-paced SkyWars",
        "Wool Wars team battles",
        "Weekend community events",
      ],
      version: "1.8 - 1.20+ supported",
      playerCapacity: "Party & solo queues",
      isWide: true,
    },
  ];

  return (
    <section id="modes" className="py-28 lg:py-32 relative z-10">
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
            Game realms
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Featured<br /><span className="text-[#ff4545]">game modes</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Engineered from scratch for flawless competitive integrity, smooth
            hit registration, and endless community gameplay across 5 custom realms.
          </p>
        </motion.div>

        {/* Game Mode Cards Grid (5 Cards balanced) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {gameModes.map((mode, index) => {
            const Icon = mode.icon;
            const isWideCard = mode.isWide;

            return (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                className={`rounded-2xl bg-[#111114]/90 border border-white/[0.08] group relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                  isWideCard ? "md:col-span-2" : ""
                }`}
              >
                {/* Mode Top Thumbnail Area */}
                <div
                  className={`relative w-full overflow-hidden bg-[#161618] border-b border-white/[0.08] ${
                    isWideCard ? "h-52 sm:h-64" : "h-48 sm:h-56"
                  }`}
                >
                  <Image
                    src={mode.image}
                    alt={mode.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/60 to-transparent" />

                  {/* Badge & Icon */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span
                      className={`rounded-full text-[11px] font-semibold px-2.5 py-1 bg-[#111114]/80 border border-white/10 ${mode.badgeColor}`}
                    >
                      {mode.badge}
                    </span>
                    <div className="rounded-full w-9 h-9 bg-[#111114]/80 border border-white/10 flex items-center justify-center text-[#ff2e2e] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                      {mode.title}
                    </h3>
                  </div>
                </div>

                {/* Mode Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                    {mode.description}
                  </p>

                  <div
                    className={`space-y-2 mb-6 ${
                      isWideCard ? "grid grid-cols-1 sm:grid-cols-2 gap-2 space-y-0" : ""
                    }`}
                  >
                    {mode.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs text-zinc-300"
                      >
                        <span className="rounded-full w-4 h-4 bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500">
                      {mode.version}
                    </span>
                    <button
                      onClick={() => setSelectedMode(mode)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff2e2e] hover:text-[#ff4545] transition-colors cursor-pointer"
                    >
                      <span>View details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mode Details Modal Dialog */}
      <Dialog
        open={!!selectedMode}
        onOpenChange={(open) => !open && setSelectedMode(null)}
      >
        {selectedMode && (
          <DialogContent className="rounded-2xl bg-[#111115] border border-white/10 text-white max-w-lg p-6 sm:p-8">
            <DialogHeader>
              <div className="rounded-full inline-flex items-center gap-2 px-3 py-1.5 bg-[#ff2e2e]/10 border border-[#ff2e2e]/20 text-[#ff4545] text-xs font-semibold w-fit mb-2">
                {selectedMode.badge}
              </div>
              <DialogTitle className="font-heading text-xl font-bold text-white">
                {selectedMode.title}
              </DialogTitle>
              <DialogDescription className="text-zinc-300 text-sm leading-relaxed mt-2">
                {selectedMode.description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-3">
              <h4 className="text-xs font-semibold text-zinc-400">
                Mode features
              </h4>
              <div className="rounded-xl space-y-2 bg-black/20 border border-white/[0.06] p-4">
                {selectedMode.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-200">
                    <span className="rounded-full w-4 h-4 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-zinc-400 font-mono">
                Connect via: <strong className="text-white">nexcoremc.in</strong>
              </div>
              <a
                href="/#how-to-join"
                onClick={() => setSelectedMode(null)}
                className="rounded-full px-5 py-2.5 bg-[#ff2e2e] hover:bg-[#ff4545] text-white text-sm font-semibold transition-colors"
              >
                Join mode now
              </a>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
