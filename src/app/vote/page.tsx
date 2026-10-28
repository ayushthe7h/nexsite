import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ThumbsUp } from "lucide-react";
import { Vote } from "@/components/landing/Vote";

export const metadata: Metadata = {
  title: "Vote for NexCoreMC - Free In-Game Rewards | NexCoreMC",
  description:
    "Vote for NexCoreMC on Minecraft-MP every 24 hours and unlock /cfly, /tfly, an extra home, an extra vault, and a Vote Key — completely free.",
};

export default function VotePage() {
  return (
    <div className="pt-32 pb-8 relative selection:bg-[#ff2e2e]/30 selection:text-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-[#ff4545] font-semibold">Vote</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="mc-outline inline-flex items-center gap-2 px-3.5 py-2 bg-[#ff2e2e]/10 text-[#ff4545] text-[9px] font-pixel tracking-wide uppercase mb-5">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Vote & Earn Rewards</span>
          </div>

          <h1 className="font-pixel text-lg sm:text-2xl text-white leading-[1.8] mb-4">
            VOTE FOR<br /><span className="text-[#ff4545]">NEXCOREMC</span>
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Takes 30 seconds, costs nothing, and helps more players find the server. Every vote unlocks real in-game rewards — straight to your inventory.
          </p>
        </div>
      </div>

      <Vote />
    </div>
  );
}
