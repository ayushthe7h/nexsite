"use client";

import React from "react";
import { SkinViewer3D } from "./SkinViewer3D";

interface StaffCardProps {
  username: string;
  role: string;
  accent: "gold" | "red" | "pink" | "blue" | "emerald";
  size?: "large" | "compact";
}

const ACCENTS: Record<StaffCardProps["accent"], { pill: string; glow: string }> = {
  gold: { pill: "bg-amber-500/15 border-amber-500/30 text-amber-300", glow: "bg-amber-500/10" },
  red: { pill: "bg-[#ff2e2e]/15 border-[#ff2e2e]/30 text-[#ff4545]", glow: "bg-[#ff2e2e]/10" },
  pink: { pill: "bg-pink-500/15 border-pink-500/30 text-pink-300", glow: "bg-pink-500/10" },
  blue: { pill: "bg-blue-500/15 border-blue-500/30 text-blue-300", glow: "bg-blue-500/10" },
  emerald: { pill: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300", glow: "bg-emerald-500/10" },
};

export function StaffCard({ username, role, accent, size = "large" }: StaffCardProps) {
  const colors = ACCENTS[accent];
  const isLarge = size === "large";
  const viewerSize = isLarge ? { width: 196, height: 250 } : { width: 150, height: 192 };

  return (
    <div className="group relative rounded-2xl bg-[#111114]/90 border border-white/[0.08] hover:border-white/[0.14] transition-colors p-6 flex flex-col items-center text-center overflow-hidden">
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 ${colors.glow} blur-[70px] rounded-full pointer-events-none`} />

      <span className={`relative rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide mb-5 ${colors.pill}`}>
        {role}
      </span>

      <div className="relative">
        <SkinViewer3D username={username} {...viewerSize} />
      </div>

      <p className={`relative font-heading font-bold text-white mt-1 ${isLarge ? "text-lg" : "text-base"}`}>
        {username}
      </p>
      <p className="relative text-zinc-500 text-xs mt-1">Drag to rotate</p>
    </div>
  );
}
