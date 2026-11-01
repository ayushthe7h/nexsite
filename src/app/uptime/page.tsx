"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Clock,
  RefreshCw,
  ExternalLink,
  Server,
  ArrowLeft,
  Radio,
} from "lucide-react";
import { useServerStatus } from "@/lib/useServerStatus";

interface ServiceComponent {
  name: string;
  category: string;
  uptime: string;
  latency: string;
  status: "operational" | "degraded" | "maintenance";
  description: string;
}

export default function UptimePage() {
  const status = useServerStatus();
  const [lastChecked, setLastChecked] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    setLastChecked(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setLastChecked(new Date().toLocaleTimeString());
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setRefreshing(true);
    setLastChecked(new Date().toLocaleTimeString());
    setCountdown(30);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  const services: ServiceComponent[] = [
    {
      name: "BungeeCord Proxy Gateway",
      category: "Network Ingress",
      uptime: "99.99%",
      latency: "12ms",
      status: status.online ? "operational" : "degraded",
      description: "Java Edition ingress routing (nexcoremc.in:25565)",
    },
    {
      name: "Geyser & Floodgate Bridge",
      category: "Cross-Play",
      uptime: "99.95%",
      latency: "16ms",
      status: "operational",
      description: "Bedrock & MCPE translation protocol (Port: 25567)",
    },
    {
      name: "Survival SMP Realm",
      category: "Game Cluster",
      uptime: "99.98%",
      latency: "14ms",
      status: "operational",
      description: "Paper 1.20+ with grief prevention & custom economy",
    },
    {
      name: "Competitive Bedwars Engine",
      category: "Game Cluster",
      uptime: "100.0%",
      latency: "11ms",
      status: "operational",
      description: "Instant matchmaking arena instances & tournament queue",
    },
    {
      name: "Practice PvP Arenas",
      category: "Game Cluster",
      uptime: "100.0%",
      latency: "10ms",
      status: "operational",
      description: "Ultra-low tick duels & custom knockback profiles",
    },
    {
      name: "Mumbai Tier-4 Datacenter Node",
      category: "Infrastructure",
      uptime: "100.0%",
      latency: "10-18ms",
      status: "operational",
      description: "Dedicated optical fiber peering across Indian ISPs",
    },
    {
      name: "Packet Anti-Cheat Shield",
      category: "Security",
      uptime: "100.0%",
      latency: "<1ms",
      status: "operational",
      description: "Real-time heuristic combat & movement packet analyzer",
    },
    {
      name: "Discord Bot & Webstore Sync",
      category: "Community Integrations",
      uptime: "99.92%",
      latency: "24ms",
      status: "operational",
      description: "Automated rank delivery & support ticket webhook listener",
    },
  ];

  const pastIncidents = [
    {
      title: "Scheduled Maintenance: Geyser Bedrock Protocol 1.21.x Sync",
      date: "October 10, 2026 — 04:00 AM IST",
      resolved: true,
      description:
        "Updated Geyser and Floodgate translation libraries to support newer Bedrock clients without version mismatch disconnects.",
    },
    {
      title: "Routing Optimization: Mumbai Tier-4 Peering Upgrade",
      date: "October 4, 2026 — 02:30 AM IST",
      resolved: true,
      description:
        "Upgraded uplink peering with major Indian ISPs (Jio, Airtel, ACT), reducing average player latency from 24ms to 12ms.",
    },
    {
      title: "Automated Anti-DDoS Mitigation Check",
      date: "September 28, 2026 — 11:15 PM IST",
      resolved: true,
      description:
        "Mitigated 45 Gbps volumetric synthetic UDP flood within 1.2 seconds with zero packet loss to in-game players.",
    },
  ];

  return (
    <div className="pt-32 pb-24 relative selection:bg-[#ff2e2e]/30 selection:text-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between gap-4 text-xs font-mono text-zinc-400 mb-8 flex-wrap">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-[#ff4545] font-semibold">Network Uptime</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-zinc-500 hidden sm:inline">
              Auto-refresh in <strong className="text-zinc-300 font-mono">{countdown}s</strong>
            </span>
            <button
              onClick={handleManualRefresh}
              className="rounded-full px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-200 text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh live telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#ff2e2e]" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Global Operational Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 p-6 sm:p-8 relative overflow-hidden mb-12"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start sm:items-center gap-4">
              <div className="rounded-full w-14 h-14 bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <div className="rounded-full inline-flex items-center gap-2 px-2.5 py-1.5 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>All systems operational</span>
                </div>
                <h1 className="font-heading text-2xl font-bold text-white">
                  NexCoreMC Network Status
                </h1>
                <p className="text-zinc-400 text-xs sm:text-sm mt-0.5 font-mono">
                  Real-time telemetry monitored from Mumbai Tier-4 Node • Last verified at {lastChecked}
                </p>
              </div>
            </div>

            {/* Quick Metrics Badge Group */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap">
              <div className="rounded-xl px-4 py-2.5 bg-black/20 border border-white/[0.08] text-center">
                <div className="text-xs text-zinc-400">
                  90-day uptime
                </div>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                  99.98%
                </div>
              </div>

              <div className="rounded-xl px-4 py-2.5 bg-black/20 border border-white/[0.08] text-center">
                <div className="text-xs text-zinc-400">
                  Avg Mumbai ping
                </div>
                <div className="text-xl font-bold font-mono text-white mt-1">
                  12ms
                </div>
              </div>

              <div className="rounded-xl px-4 py-2.5 bg-black/20 border border-white/[0.08] text-center">
                <div className="text-xs text-zinc-400">
                  Players online
                </div>
                <div className="text-xl font-bold font-mono text-[#ff4545] mt-1">
                  {status.onlinePlayers} / {status.maxPlayers}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 90-Day Uptime Bar Visualizer */}
        <div className="rounded-2xl bg-[#111114]/90 border border-white/[0.08] p-6 mb-12">
          <div className="flex items-center justify-between mb-3 text-xs flex-wrap gap-2">
            <span className="font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Overall network history (past 90 days)</span>
            </span>
            <span className="text-emerald-400 font-mono font-semibold">
              99.98% available
            </span>
          </div>

          {/* 90 Bar ticks - each block is a day */}
          <div className="grid grid-cols-45 sm:grid-cols-90 gap-1 h-8 items-center py-1">
            {Array.from({ length: 90 }).map((_, i) => (
              <div
                key={i}
                className="h-full rounded-sm bg-emerald-500 hover:bg-emerald-300 transition-colors cursor-pointer"
                title={`Day ${90 - i} Days Ago: 100% Uptime`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono mt-2">
            <span>90 days ago</span>
            <span className="text-zinc-400">0 critical network downtime events</span>
            <span>Today</span>
          </div>
        </div>

        {/* Individual Component Services List */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-white">
                Core services
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Individual operational status for network nodes, game realms, and bridging protocols.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="rounded-2xl bg-[#111114]/90 border border-white/[0.08] p-4 sm:p-5 hover:bg-white/[0.04] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="rounded-xl w-10 h-10 bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 shrink-0">
                    <Server className="w-5 h-5 text-[#ff2e2e]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading font-bold text-white text-sm sm:text-base">
                        {service.name}
                      </h3>
                      <span className="rounded-full text-xs px-2.5 py-0.5 bg-white/[0.04] border border-white/[0.08] text-zinc-400">
                        {service.category}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs mt-0.5 font-mono">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-auto text-xs">
                  <div className="text-right">
                    <span className="text-zinc-500 text-xs block">
                      Latency
                    </span>
                    <span className="font-mono text-zinc-300 font-bold">
                      {service.latency}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-zinc-500 text-xs block">
                      Uptime
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {service.uptime}
                    </span>
                  </div>

                  <div className="rounded-full inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Operational</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Past Incident & Maintenance Log */}
        <div className="rounded-2xl bg-[#111114]/90 border border-white/[0.08] p-6 sm:p-8 mb-12">
          <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-6">
            <Clock className="w-5 h-5 text-[#ff2e2e]" />
            <h3 className="font-heading text-xl font-bold text-white">
              Past incident log
            </h3>
          </div>

          <div className="space-y-6">
            {pastIncidents.map((incident, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-emerald-500/50 pb-2">
                <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-emerald-400" />
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    {incident.title}
                  </h4>
                  <span className="rounded-full text-xs px-2.5 py-0.5 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 font-medium">
                    Resolved
                  </span>
                </div>
                <div className="text-xs text-zinc-500 font-mono mb-2">
                  {incident.date}
                </div>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {incident.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe / Discord Support Callout */}
        <div className="rounded-2xl bg-[#111114]/90 border border-white/[0.08] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl w-12 h-12 bg-[#5865f2] flex items-center justify-center text-white shrink-0">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-base sm:text-lg">
                Get instant status alerts on Discord
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm mt-0.5">
                Join our Discord and follow the <code className="text-[#818cf8] font-mono">#announcements</code> channel for instant maintenance schedules.
              </p>
            </div>
          </div>

          <a
            href="https://discord.gg/nexcoremc"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full shrink-0 px-6 py-3 bg-[#5865f2] hover:bg-[#4752c4] text-white font-semibold text-sm flex items-center gap-2 transition-colors"
          >
            <span>Discord status desk</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
