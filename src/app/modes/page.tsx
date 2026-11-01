import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Swords } from "lucide-react";
import { GameModes } from "@/components/landing/GameModes";
import { DiscordBanner } from "@/components/landing/DiscordBanner";

export const metadata: Metadata = {
  title: "Game Modes - Survival SMP, Bedwars & Practice PvP | NexCoreMC",
  description:
    "Explore dedicated gamemodes on NexCoreMC (nexcoremc.in): Survival SMP with land claiming, competitive Bedwars tournaments, 1v1 Practice PvP duels, and Parkour.",
};

export default function GameModesPage() {
  return (
    <div className="pt-32 pb-20 relative selection:bg-[#ff2e2e]/30 selection:text-white">
      {/* Page Header Banner */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-[#ff4545] font-semibold">Game Modes</span>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="rounded-full inline-flex items-center gap-2 px-3.5 py-2 bg-[#ff2e2e]/10 border border-[#ff2e2e]/20 text-[#ff4545] text-sm font-medium mb-5">
            <Swords className="w-3.5 h-3.5" />
            <span>Multiplayer realms</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Explore our<br /><span className="text-[#ff4545]">game modes</span>
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            From relaxed community survival with golden shovel land claiming, to competitive high-octane Bedwars and 1v1 Practice duels.
          </p>
        </div>
      </div>

      {/* Main GameModes Grid Component */}
      <GameModes />

      {/* Community Banner */}
      <div className="-mt-12">
        <DiscordBanner />
      </div>
    </div>
  );
}
