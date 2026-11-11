import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Crown, ShieldCheck } from "lucide-react";
import { StaffCard } from "@/components/staff/StaffCard";

export const metadata: Metadata = {
  title: "Leadership & Staff | NexCoreMC Minecraft Network",
  description:
    "Meet the people behind NexCoreMC (nexcoremc.in) - the founder, owner, co-owner, and the staff team that runs the network day to day.",
};

const LEADERSHIP = [
  { username: "akashxd", role: "Founder", accent: "gold" as const },
  { username: "Notayush_XD", role: "Owner", accent: "red" as const },
  { username: "Charizard_verma", role: "Co-Owner", accent: "pink" as const },
];

const STAFF = [
  { username: "Harsuu", role: "Manager", accent: "blue" as const },
  { username: "Devilmindv", role: "Partner", accent: "emerald" as const },
];

export default function StaffPage() {
  return (
    <main className="pt-32 pb-24 px-4 sm:px-6 relative z-10 max-w-5xl mx-auto w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-10">
        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-[#ff4545] font-semibold">Staff</span>
      </div>

      {/* Leadership header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="rounded-full inline-flex items-center gap-2 px-3.5 py-2 bg-[#ff2e2e]/10 border border-[#ff2e2e]/20 text-[#ff4545] text-sm font-medium mb-5">
          <Crown className="w-3.5 h-3.5" />
          <span>Leadership</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          Meet the <span className="text-[#ff4545]">team</span>
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          NexCoreMC is built and run by a small team that plays on the server every day. Drag any card to spin the model around.
        </p>
      </div>

      {/* Leadership cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
        {LEADERSHIP.map((person) => (
          <StaffCard key={person.username} username={person.username} role={person.role} accent={person.accent} size="large" />
        ))}
      </div>

      {/* Server staff header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="rounded-full inline-flex items-center gap-2 px-3.5 py-2 bg-white/[0.05] border border-white/10 text-zinc-300 text-sm font-medium mb-5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Server staff</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
          The rest of the crew
        </h2>
      </div>

      {/* Staff cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-2xl mx-auto">
        {STAFF.map((person) => (
          <StaffCard key={person.username} username={person.username} role={person.role} accent={person.accent} size="compact" />
        ))}
      </div>
    </main>
  );
}
