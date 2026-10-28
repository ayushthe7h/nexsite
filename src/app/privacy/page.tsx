import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ToastProvider } from "@/components/landing/ToastContext";

export const metadata = {
  title: "Privacy Policy - NexCoreMC Minecraft Network",
  description:
    "Official Privacy Policy for NexCoreMC Network (nexcoremc.in). Learn how we handle your data, network logs, and account security.",
};

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-24 px-4 sm:px-6 relative z-10 max-w-4xl mx-auto w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-[#ff4545] font-semibold">Privacy Policy</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="mc-outline inline-flex items-center gap-2 px-3.5 py-2 bg-[#ff2e2e]/10 text-[#ff4545] text-[9px] font-pixel tracking-wide uppercase mb-5">
              <Shield className="w-3.5 h-3.5" />
              <span>Legal & Data Protection</span>
            </div>
            <h1 className="font-pixel text-lg sm:text-2xl text-white leading-[1.8] mb-4">
              PRIVACY<br /><span className="text-[#ff4545]">POLICY</span>
            </h1>
            <p className="text-zinc-400 text-sm font-mono">
              Effective Date: October 9, 2026 | Last Updated: October 2026
            </p>
          </div>

          {/* Content Card */}
          <div className="mc-panel p-8 sm:p-12 bg-[#1a120f] space-y-10 text-zinc-300 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white pb-2 border-b border-[#ff2e2e]/15 flex items-center gap-2">
                <span>1. Introduction</span>
              </h2>
              <p>
                Welcome to NexCoreMC Network (&ldquo;NexCoreMC&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We operate the Minecraft multiplayer network accessible at <strong className="text-white font-mono">nexcoremc.in</strong> and its associated web services. We are dedicated to protecting your privacy and ensuring a safe, fair gaming environment for all players.
              </p>
              <p>
                This Privacy Policy explains what information we collect when you visit our website, connect to our Minecraft servers, participate in our Discord community, or purchase server ranks and perks.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white pb-2 border-b border-[#ff2e2e]/15">
                2. Information We Collect
              </h2>
              <p>We only collect the minimum amount of data required to operate and secure the server:</p>
              <ul className="space-y-2 pl-4 list-disc marker:text-[#ff2e2e]">
                <li><strong className="text-white">Minecraft Account Information:</strong> Your in-game username (IGN), unique Minecraft UUID, skin assets, and in-game statistics (player level, economy balance, game mode achievements).</li>
                <li><strong className="text-white">Connection & Network Logs:</strong> IP address, connection timestamps, and protocol handshake data used strictly for DDoS mitigation, firewall routing, and automated anti-cheat heuristic verification.</li>
                <li><strong className="text-white">Community & Support Data:</strong> Discord username and snowflake ID when opening support tickets or claiming store perks through our Discord server.</li>
                <li><strong className="text-white">Store Transaction Records:</strong> Order identifiers, purchased rank tier, and activation timestamp. We do not process or store credit card numbers, bank credentials, or sensitive payment details directly on our servers.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white pb-2 border-b border-[#ff2e2e]/15">
                3. How We Use Your Information
              </h2>
              <p>The information we collect is used strictly for the following purposes:</p>
              <ul className="space-y-2 pl-4 list-disc marker:text-[#ff2e2e]">
                <li>Authorizing account access and preserving player inventory, land claims, and statistics.</li>
                <li>Enforcing network rules, maintaining anti-cheat heuristics, and preventing unauthorized exploits.</li>
                <li>Delivering purchased in-game perks, permissions, and rank titles.</li>
                <li>Providing customer support and resolving player inquiries through our official Discord ticket system.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white pb-2 border-b border-[#ff2e2e]/15">
                4. Data Storage and Security
              </h2>
              <p>
                All server databases and telemetry are hosted within Tier-4 enterprise data centers equipped with strict access controls, firewall isolation, and industry-standard encryption protocols. We do not sell, rent, or trade your personal information to third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white pb-2 border-b border-[#ff2e2e]/15">
                5. Third-Party Integrations
              </h2>
              <p>Our platform interacts with select third-party services essential for multiplayer functionality:</p>
              <ul className="space-y-2 pl-4 list-disc marker:text-[#ff2e2e]">
                <li><strong className="text-white">Mojang / Microsoft Authentication:</strong> Used to verify legitimate Minecraft licenses and retrieve player UUIDs.</li>
                <li><strong className="text-white">Discord API:</strong> Used for community communications, ticket support, and community announcements.</li>
                <li><strong className="text-white">Public Status APIs (mcstatus.io / mcsrvstat.us):</strong> Used to fetch real-time public player count statistics.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white pb-2 border-b border-[#ff2e2e]/15">
                6. Children&apos;s Privacy
              </h2>
              <p>
                NexCoreMC is intended for general gaming audiences. We do not knowingly collect personal contact information from children under the age of 13. If you believe that a minor has provided sensitive personal information on our services, please contact us immediately so we can remove it.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-white pb-2 border-b border-[#ff2e2e]/15">
                7. Contact and Support
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to request data review or deletion, please open a support ticket on our official Discord server at{" "}
                <a
                  href="https://discord.gg/nexcoremc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff2e2e] hover:underline font-medium"
                >
                  discord.gg/nexcoremc
                </a>.
              </p>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="mc-btn inline-flex items-center gap-2 px-6 py-3 bg-[#1a120f] text-white font-pixel text-[10px] tracking-wide"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO HOMEPAGE</span>
            </Link>
          </div>
        </main>
  );
}
