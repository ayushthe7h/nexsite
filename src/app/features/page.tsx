import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Zap } from "lucide-react";
import { Features } from "@/components/landing/Features";
import { StatsStrip } from "@/components/landing/StatsStrip";
import { DiscordBanner } from "@/components/landing/DiscordBanner";

export const metadata: Metadata = {
  title: "Server Features & Infrastructure | NexCoreMC Network",
  description:
    "Discover the engineering behind NexCoreMC (nexcoremc.in): dedicated Mumbai server hosting, enterprise anti-cheat detection, constant 20 TPS, and custom plugins.",
};

export default function FeaturesPage() {
  return (
    <div className="pt-32 pb-20 relative selection:bg-[#ff2e2e]/30 selection:text-white">
      {/* Page Header Banner */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-[#ff4545] font-semibold">Features</span>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="rounded-full inline-flex items-center gap-2 px-3.5 py-2 bg-[#ff2e2e]/10 border border-[#ff2e2e]/20 text-[#ff4545] text-sm font-medium mb-5">
            <Zap className="w-3.5 h-3.5" />
            <span>High performance network</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Network<br /><span className="text-[#ff4545]">features & specs</span>
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Built from the ground up for competitive and community Minecraft play with industry-standard hardware, sub-20ms latency across India, and zero pay-to-win mechanics.
          </p>
        </div>
      </div>

      {/* Network Stats Highlights */}
      <div className="mb-12">
        <StatsStrip />
      </div>

      {/* Features Grid */}
      <Features />

      {/* Community Callout */}
      <div className="-mt-8">
        <DiscordBanner />
      </div>
    </div>
  );
}
