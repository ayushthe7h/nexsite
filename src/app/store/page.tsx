import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { StoreRanks } from "@/components/landing/StoreRanks";
import { DiscordBanner } from "@/components/landing/DiscordBanner";

export const metadata: Metadata = {
  title: "Store & Ranks - VIP+, CORE, BOSS, GOD, NEX Memberships | NexCoreMC",
  description:
    "Upgrade your gameplay experience with NexCoreMC network ranks: VIP+, CORE, BOSS, GOD, NEX and CUSTOM. Enjoy extra homes, vaults, enchanted kits, and more while remaining 100% Non-P2W compliant.",
};

export default function StorePage() {
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
          <span className="text-[#ff4545] font-semibold">Store & Ranks</span>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="mc-outline inline-flex items-center gap-2 px-3.5 py-2 bg-[#ff2e2e]/10 text-[#ff4545] text-[9px] font-pixel tracking-wide uppercase mb-5">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Network Store</span>
          </div>
          <h1 className="font-pixel text-lg sm:text-2xl text-white leading-[1.8] mb-4">
            SERVER RANKS &<br /><span className="text-[#ff4545]">MEMBERSHIPS</span>
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Support the ongoing hosting and development of NexCoreMC. All ranks strictly adhere to Mojang Commercial Guidelines and feature cosmetic and quality-of-life perks.
          </p>
        </div>
      </div>

      {/* Main Store Ranks Matrix Component */}
      <StoreRanks />

      {/* Discord Banner */}
      <div className="-mt-8">
        <DiscordBanner />
      </div>
    </div>
  );
}
