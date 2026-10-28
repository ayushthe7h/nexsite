import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, HelpCircle, ShieldAlert, ExternalLink } from "lucide-react";
import { FAQSection } from "@/components/landing/FAQSection";
import { DiscordBanner } from "@/components/landing/DiscordBanner";

export const metadata: Metadata = {
  title: "Frequently Asked Questions & Server Rules | NexCoreMC",
  description:
    "Find answers to common questions about connecting to NexCoreMC (nexcoremc.in), gameplay mechanics, ban appeals, Bedrock setup, and player guidelines.",
};

export default function FAQPage() {
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
          <span className="text-[#ff4545] font-semibold">Help & FAQ</span>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="mc-outline inline-flex items-center gap-2 px-3.5 py-2 bg-[#ff2e2e]/10 text-[#ff4545] text-[9px] font-pixel tracking-wide uppercase mb-5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Base</span>
          </div>
          <h1 className="font-pixel text-lg sm:text-2xl text-white leading-[1.8] mb-4">
            FREQUENTLY ASKED<br /><span className="text-[#ff4545]">QUESTIONS</span>
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Need help joining, understanding land claims, or reporting a bug? Find comprehensive answers and ticket guidelines below.
          </p>
        </div>
      </div>

      {/* Main FAQ Accordion Component */}
      <FAQSection />

      {/* Rules & Guidelines Summary Card */}
      <div className="max-w-[880px] mx-auto px-4 sm:px-6 mt-8 mb-16">
        <div className="mc-panel p-8 bg-[#1a120f] space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <ShieldAlert className="w-5 h-5 text-[#ff2e2e]" />
            <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-white">
              Core Community Rules
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-zinc-300">
            <div className="mc-outline p-4 bg-[#15100c] space-y-1.5">
              <span className="font-bold text-white font-['Chakra_Petch'] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ff2e2e]" />
                1. No Cheating or Exploiting
              </span>
              <p className="text-zinc-400 text-xs">
                X-ray, auto-clickers (&gt;15 CPS), flight, speed, and hacked clients result in permanent hardware bans.
              </p>
            </div>

            <div className="mc-outline p-4 bg-[#15100c] space-y-1.5">
              <span className="font-bold text-white font-['Chakra_Petch'] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ff2e2e]" />
                2. Respect All Players
              </span>
              <p className="text-zinc-400 text-xs">
                Zero tolerance for toxicity, hate speech, doxxing, harassment, or advertising other servers in public chat.
              </p>
            </div>

            <div className="mc-outline p-4 bg-[#15100c] space-y-1.5">
              <span className="font-bold text-white font-['Chakra_Petch'] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ff2e2e]" />
                3. Protect Your Claims
              </span>
              <p className="text-zinc-400 text-xs">
                Always claim your bases using a golden shovel on Survival SMP. Griefing unclaimed builds is monitored.
              </p>
            </div>

            <div className="mc-outline p-4 bg-[#15100c] space-y-1.5">
              <span className="font-bold text-white font-['Chakra_Petch'] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ff2e2e]" />
                4. Fair Trade Economy
              </span>
              <p className="text-zinc-400 text-xs">
                Scamming in player shops or auction houses is penalized. Real-money trading outside the store is prohibited.
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between flex-wrap gap-4 text-xs text-zinc-400">
            <Link href="/terms" className="hover:text-white text-[#ff4545] font-semibold underline">
              Read Complete Terms & Conditions
            </Link>
            <a
              href="https://discord.gg/nexcoremc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#5865f2]"
            >
              <span>Submit Ban Appeal on Discord</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Discord Banner */}
      <div className="-mt-8">
        <DiscordBanner />
      </div>
    </div>
  );
}
