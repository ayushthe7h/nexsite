import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale, ShieldAlert, ShoppingBag, Lock, HelpCircle } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ToastProvider } from "@/components/landing/ToastContext";

export const metadata = {
  title: "Terms & Conditions - NexCoreMC Minecraft Network",
  description:
    "Official Terms & Conditions and Server Rules for NexCoreMC Network (nexcoremc.in). Read our fair play guidelines, store policies, and conduct rules.",
};

export default function TermsPage() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#09090b] text-[#f4f4f6] flex flex-col justify-between">
        <Navbar />

        <main className="pt-36 pb-24 px-4 sm:px-6 relative z-10 max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff2e2e]/10 border border-[#ff2e2e]/25 text-[#ff4545] text-xs font-bold font-['Chakra_Petch'] tracking-wider uppercase mb-4">
              TERMS OF SERVICE
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
              TERMS & CONDITIONS
            </h1>
            <p className="text-zinc-400 text-sm font-mono">
              Effective Date: October 9, 2026 | Last Updated: October 2026
            </p>
          </div>

          {/* Content Card */}
          <div className="p-8 sm:p-12 rounded-2xl bg-[#111115] border border-white/10 space-y-10 shadow-2xl text-zinc-300 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white pb-2 border-b border-white/10">
                1. Agreement to Terms
              </h2>
              <p>
                By accessing or playing on NexCoreMC Network (server address: <strong className="text-white font-mono">nexcoremc.in</strong>, port: <strong className="text-white font-mono">25567</strong>), visiting our website, or utilizing our Discord services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of our network immediately.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white pb-2 border-b border-white/10">
                2. Player Conduct & Fair Play Rules
              </h2>
              <p>NexCoreMC is committed to an enjoyable, competitive, and respectful gaming environment. You agree not to:</p>
              <ul className="space-y-2 pl-4 list-disc marker:text-[#ff2e2e]">
                <li><strong className="text-white">Use Unauthorized Modifications:</strong> Using hacked clients, combat cheats (KillAura, Reach, Auto-Clicker, Aimbot), movement hacks (Fly, Speed, Jesus), X-Ray texture packs, or automated bot scripts is strictly prohibited.</li>
                <li><strong className="text-white">Exploit Bugs or Duplication Glitches:</strong> Any discovery of game-breaking duplication or economy bugs must be reported directly to staff. Exploiting glitches will result in immediate permanent bans.</li>
                <li><strong className="text-white">Engage in Disruptive Behavior:</strong> Harassment, hate speech, spamming, advertising other servers, doxxing, or real-world threats are strictly forbidden across all text chats and Discord channels.</li>
                <li><strong className="text-white">Ban Evasion:</strong> Creating alternate accounts (alts) to bypass active punishments will result in all associated accounts being permanently blacklisted.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white pb-2 border-b border-white/10">
                3. Virtual Goods & Store Purchases
              </h2>
              <p>When purchasing server ranks, cosmetic tags, or perks from our official Discord store:</p>
              <ul className="space-y-2 pl-4 list-disc marker:text-[#ff2e2e]">
                <li><strong className="text-white">Digital Goods Delivery:</strong> All purchases represent non-tangible digital items that are activated automatically upon order verification.</li>
                <li><strong className="text-white">Monthly Subscription Terms:</strong> Server ranks (VIP+, CORE, BOSS, GOD, NEX, CUSTOM) are active on a monthly cycle from the date of activation.</li>
                <li><strong className="text-white">Non-Pay-to-Win (Non-P2W) Standard:</strong> Ranks grant convenience features, custom tags, expanded vault storage, and cosmetic privileges. They do not alter fundamental combat mechanics.</li>
                <li><strong className="text-white">Refund Policy & Chargebacks:</strong> Due to the instant delivery of digital perks, all completed transactions are non-refundable. Initiating unauthorized payment disputes or chargebacks results in automated permanent blacklisting across the network.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white pb-2 border-b border-white/10">
                4. Account Security & Registration
              </h2>
              <p>
                Players are responsible for maintaining the confidentiality of their in-game account password set via <code className="px-2 py-0.5 rounded bg-black border border-white/10 text-white font-mono text-xs">/register</code>. NexCoreMC staff will never ask for your password. We are not liable for unauthorized access resulting from compromised or shared passwords.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white pb-2 border-b border-white/10">
                5. Mojang / Microsoft Commercial Usage & Disclaimer
              </h2>
              <p>
                NexCoreMC is not an official Minecraft product. We are not approved by, associated with, or affiliated with Mojang AB or Microsoft Corporation. &ldquo;Minecraft&rdquo; is a registered trademark of Mojang Synergies AB.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white pb-2 border-b border-white/10">
                6. Service Availability & Modifications
              </h2>
              <p>
                We strive to maintain 99.9% network uptime; however, we reserve the right to perform scheduled server maintenance, apply software updates, or adjust in-game balancing without prior notice to ensure optimal performance.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white pb-2 border-b border-white/10">
                7. Appeals & Inquiries
              </h2>
              <p>
                To submit a ban appeal, report a player, or ask questions regarding these terms, open a ticket on our official Discord server at{" "}
                <a
                  href="https://discord.gg/7e6vX6EgFt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff2e2e] hover:underline font-medium"
                >
                  discord.gg/7e6vX6EgFt
                </a>.
              </p>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#16161c] hover:bg-[#1c1c24] border border-white/10 text-white font-['Chakra_Petch'] text-xs font-bold tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO HOMEPAGE</span>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </ToastProvider>
  );
}
