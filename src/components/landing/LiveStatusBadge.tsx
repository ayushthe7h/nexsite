"use client";

import React from "react";
import { Loader2, Users } from "lucide-react";
import { useServerStatus } from "@/lib/useServerStatus";

export function LiveStatusBadge({ compact = false }: { compact?: boolean }) {
  const status = useServerStatus();

  if (compact) {
    return (
      <div className="rounded-full flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] text-xs font-medium">
        {status.loading ? (
          <>
            <Loader2 className="w-3 h-3 text-[#ff2e2e] animate-spin" />
            <span className="text-zinc-400">Pinging server...</span>
          </>
        ) : status.online ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-medium">Online</span>
            <span className="text-zinc-300 font-mono text-[11px]">
              {status.onlinePlayers}/{status.maxPlayers}
            </span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-zinc-300">Server ready</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-full inline-flex items-center gap-2.5 px-4 py-2 bg-white/[0.04] border border-white/[0.08] text-xs sm:text-sm">
      {status.loading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 text-[#ff2e2e] animate-spin" />
          <span className="text-zinc-400 font-medium">Checking live telemetry...</span>
        </>
      ) : status.online ? (
        <>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-medium">
            Network live
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-white font-mono font-semibold">
            nexcoremc.in
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300 font-mono font-medium flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#ff2e2e]" />
            <span className="text-white font-bold">{status.onlinePlayers}</span> / {status.maxPlayers} playing now
          </span>
        </>
      ) : (
        <>
          <span className="relative flex h-2.5 w-2.5">
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-zinc-200 font-medium">
            nexcoremc.in online
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 font-mono">Java & Bedrock ready</span>
        </>
      )}
    </div>
  );
}
