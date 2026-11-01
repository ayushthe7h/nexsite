import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Play, HelpCircle, ExternalLink } from "lucide-react";
import { HowToJoin } from "@/components/landing/HowToJoin";

export const metadata: Metadata = {
  title: "How to Join NexCoreMC - Java & Bedrock Connection Guide",
  description:
    "Step-by-step instructions for connecting to NexCoreMC (nexcoremc.in) on Minecraft Java Edition (1.8-1.20+) and Minecraft Bedrock / Pocket Edition (Port 25567).",
};

export default function HowToJoinPage() {
  return (
    <div className="pt-32 pb-24 relative selection:bg-[#ff2e2e]/30 selection:text-white">
      {/* Page Header Banner */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-[#ff4545] font-semibold">How to Join</span>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="rounded-full inline-flex items-center gap-2 px-3.5 py-2 bg-[#ff2e2e]/10 border border-[#ff2e2e]/20 text-[#ff4545] text-sm font-medium mb-5">
            <Play className="w-3.5 h-3.5" />
            <span>Connection tutorial</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            How to<br /><span className="text-[#ff4545]">join the server</span>
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Connect in seconds from any device. We support all modern Minecraft Java Edition versions alongside full Bedrock / MCPE cross-play.
          </p>
        </div>
      </div>

      {/* Main HowToJoin Interactive Component */}
      <HowToJoin />

      {/* Connection FAQ Quick Card */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 mt-16">
        <div className="rounded-2xl bg-[#111114]/90 border border-white/[0.08] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl w-12 h-12 bg-[#ff2e2e]/10 border border-[#ff2e2e]/20 flex items-center justify-center text-[#ff2e2e] shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Trouble connecting or getting ping timeouts?
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
                Our support team is active 24/7 on Discord to help verify client versions and DNS routes.
              </p>
            </div>
          </div>

          <a
            href="https://discord.gg/nexcoremc"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full shrink-0 px-6 py-3 bg-[#5865f2] hover:bg-[#4752c4] text-white font-semibold text-sm flex items-center gap-2 transition-colors"
          >
            <span>Get Discord support</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
