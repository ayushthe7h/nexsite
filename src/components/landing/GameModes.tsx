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
      title: "SURVIVAL SMP",
      badge: "MOST POPULAR",
      badgeColor: "bg-[#ff2e2e]/20 text-[#ff4545]",
      icon: Compass,
      image: "/assets/survival.jpg",
      description:
        "Classic survival elevated with custom player economy, golden shovel land claims, custom enchantments, player warps, and community boss dungeons.",
      features: [
        "Grief Prevention & Land Claims",
        "Player Warps & Player-driven Economy",
        "Custom Dungeons & Boss Spawns",
        "Auction House & Chest Shops",
      ],
      version: "1.20.x Compatible",
      playerCapacity: "Dedicated SMP Realm",
    },
    {
      id: "bedwars",
      title: "COMPETITIVE BEDWARS",
      badge: "ESPORTS FOCUS",
      badgeColor: "bg-blue-500/20 text-blue-400",
      icon: Swords,
      image: "/assets/bedwars.jpg",
      description:
        "Fast-paced tactical bed protection with refined generator speeds, smooth bridging mechanics, custom shop balancing, and monthly competitive tournaments.",
      features: [
        "Solo, Doubles, 3v3v3v3 & 4v4v4v4 Modes",
        "Responsive Hit Registration & Fast Bridging",
        "Ranked Elo & Monthly Trophy Ladders",
        "Cosmetic Kill Effects & Win Celebrations",
      ],
      version: "1.8 - 1.20+ Seamless",
      playerCapacity: "Instant Matchmaking",
    },
    {
      id: "practice",
      title: "PRACTICE PVP",
      badge: "RANKED LADDER",
      badgeColor: "bg-emerald-500/20 text-emerald-400",
      icon: Target,
      image: "/assets/survival.jpg",
      description:
        "High-performance 1v1 and team duels featuring NoDebuff, Boxing, Classic, Combo, GApple, and custom kits with pristine knockback profiles.",
      features: [
        "Optimized Knockback & Hit Detection",
        "Ranked & Unranked Match Queues",
        "Post-Match Damage Analytics",
        "Custom Kit Editor & FFA Arenas",
      ],
      version: "1.8.9 Combat Mechanics",
      playerCapacity: "Global Leaderboards",
    },
    {
      id: "parkour",
      title: "PARKOUR REALMS",
      badge: "SKILL & SPEED",
      badgeColor: "bg-amber-500/20 text-amber-400",
      icon: Flame,
      image: "/assets/bedwars.jpg",
      description:
        "Precision jump courses spanning from beginner courses to elite master runs. Features millisecond time tracking, ghost replays, and checkpoint portals.",
      features: [
        "50+ Linear & Open Jump Courses",
        "Millisecond Precision Timer",
        "Checkpoint Persistence & Quick Reset",
        "Speedrun Leaderboard Trophies",
      ],
      version: "Universal Support",
      playerCapacity: "Single & Multiplayer",
    },
    {
      id: "minigames",
      title: "MINI-GAMES HUB",
      badge: "PARTY GAMES",
      badgeColor: "bg-rose-500/20 text-rose-400",
      icon: Gamepad2,
      image: "/assets/hero_bg.jpg",
      description:
        "Fast-paced party games including The Bridge, SkyWars, and Wool Wars - quick rounds, easy to jump into with friends.",
      features: [
        "The Bridge (1v1 & 2v2)",
        "Fast-Paced SkyWars",
        "Wool Wars Team Battles",
        "Weekend Community Events",
      ],
      version: "1.8 - 1.20+ Supported",
      playerCapacity: "Party & Solo Queues",
      isWide: true,
    },
  ];

  return (
    <section id="modes" className="py-28 lg:py-32 relative z-10 bg-pixel-grid">
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
            Game Realms
          </div>
          <h2 className="font-pixel text-lg sm:text-2xl text-white leading-[1.8] mb-4">
            FEATURED<br /><span className="text-[#ff4545]">GAME MODES</span>
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
                className={`mc-panel group relative bg-[#1a120f] overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                  isWideCard ? "md:col-span-2" : ""
                }`}
              >
                {/* Mode Top Thumbnail Area */}
                <div
                  className={`relative w-full overflow-hidden bg-[#181114] border-b-2 border-black/40 ${
                    isWideCard ? "h-52 sm:h-64" : "h-48 sm:h-56"
                  }`}
                >
                  <Image
                    src={mode.image}
                    alt={mode.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                    style={{ imageRendering: "pixelated" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a120f] via-[#1a120f]/60 to-transparent" />

                  {/* Badge & Icon */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span
                      className={`mc-outline text-[8px] font-pixel px-2.5 py-1.5 bg-[#15100c] uppercase ${mode.badgeColor}`}
                    >
                      {mode.badge}
                    </span>
                    <div className="mc-outline w-9 h-9 bg-[#15100c] flex items-center justify-center text-[#ff2e2e] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-pixel text-sm sm:text-base text-white leading-relaxed">
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
                        <span className="mc-outline w-4 h-4 bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500">
                      {mode.version}
                    </span>
                    <button
                      onClick={() => setSelectedMode(mode)}
                      className="inline-flex items-center gap-1.5 text-[9px] font-pixel text-[#ff2e2e] hover:text-[#ff4545] uppercase transition-colors cursor-pointer"
                    >
                      <span>VIEW DETAILS</span>
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
          <DialogContent className="mc-panel bg-[#1a120f] border-0 text-white max-w-lg p-6 sm:p-8">
            <DialogHeader>
              <div className="mc-outline inline-flex items-center gap-2 px-3 py-1.5 bg-[#ff2e2e]/10 text-[#ff4545] text-[8px] font-pixel uppercase w-fit mb-2">
                {selectedMode.badge}
              </div>
              <DialogTitle className="font-pixel text-base text-white">
                {selectedMode.title}
              </DialogTitle>
              <DialogDescription className="text-zinc-300 text-sm leading-relaxed mt-2">
                {selectedMode.description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-3">
              <h4 className="text-[9px] font-pixel text-zinc-400 uppercase">
                Mode Features
              </h4>
              <div className="mc-panel-sunken space-y-2 bg-black/30 p-4">
                {selectedMode.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-200">
                    <span className="mc-outline w-4 h-4 bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
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
                className="mc-btn px-4 py-2.5 bg-gradient-to-r from-[#ff2e2e] to-[#b91c1c] text-white text-[9px] font-pixel hover:from-[#ff4545] hover:to-[#dc2626]"
              >
                JOIN MODE NOW
              </a>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
