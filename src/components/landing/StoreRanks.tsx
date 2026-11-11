"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Crown, ExternalLink, Eye, Info, Loader2, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const USERNAME_PATTERN = /^[A-Za-z0-9_]{3,16}$/;
const DISCORD_URL = "https://discord.gg/nexcoremc";

interface Rank {
  id: string;
  name: string;
  badge: string;
  color: string;
  glowColor: string;
  priceInr: string;
  priceUsd: string;
  tag: string;
  perks: string[];
  commands: string[];
  pvpKit: string[];
}

export function StoreRanks() {
  const [currency, setCurrency] = useState<"inr" | "usd">("inr");
  const [selectedRank, setSelectedRank] = useState<Rank | null>(null);
  const [buyRank, setBuyRank] = useState<Rank | null>(null);
  const [username, setUsername] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  // CUSTOM rank request flow - this tier is bespoke (hand-built armor,
  // tag color, kit) so it isn't sold through Tebex. Instead we build a
  // plaintext summary, copy it to the clipboard, and hand the player off
  // to Discord to open a ticket with staff.
  const [customTicketOpen, setCustomTicketOpen] = useState(false);
  const [customUsername, setCustomUsername] = useState("");
  const [customPlatform, setCustomPlatform] = useState<"java" | "bedrock">("java");
  const [customRequest, setCustomRequest] = useState("");
  const [customTicketError, setCustomTicketError] = useState("");

  // Real perks, prices and kit contents pulled from the live /ranks GUI
  // config - not invented copy. Where the config doesn't name a specific
  // enchant level (VIP+ through NEX), we describe the armor the way the
  // owner described it rather than guessing exact enchantment tiers.
  const ranks: Rank[] = [
    {
      id: "vip",
      name: "VIP+",
      badge: "ENTRY TIER",
      color: "text-emerald-400",
      glowColor: "group-hover:bg-emerald-500/10",
      priceInr: "₹129",
      priceUsd: "$1.35",
      tag: "[VIP+]",
      perks: [
        "Chat Prefix: [VIP+]",
        "5 Homes (/sethome)",
        "3 Personal Vaults",
        "Claim Fly for 10 minutes",
        "VIP+ Exclusive Kit",
      ],
      commands: ["Kit preview: /playerkits preview vip+", "Bonus commands: coming soon"],
      pvpKit: ["Diamond Armor Set — half enchanted"],
    },
    {
      id: "core",
      name: "CORE",
      badge: "POPULAR",
      color: "text-blue-400",
      glowColor: "group-hover:bg-blue-500/10",
      priceInr: "₹249",
      priceUsd: "$2.61",
      tag: "[CORE]",
      perks: [
        "Chat Prefix: [CORE]",
        "6 Homes (/sethome)",
        "4 Personal Vaults",
        "Claim Fly for 20 minutes",
        "CORE Exclusive Kit",
      ],
      commands: ["Kit preview: /playerkits preview core", "Bonus commands: coming soon"],
      pvpKit: ["Diamond Armor Set — better enchants than VIP+"],
    },
    {
      id: "boss",
      name: "BOSS",
      badge: "TIER 3",
      color: "text-cyan-400",
      glowColor: "group-hover:bg-cyan-500/10",
      priceInr: "₹459",
      priceUsd: "$4.81",
      tag: "[BOSS]",
      perks: [
        "Chat Prefix: [BOSS]",
        "7 Homes (/sethome)",
        "5 Personal Vaults",
        "Claim Fly for 20 minutes",
        "AntMan Custom Tool (10-day timer)",
        "BOSS Exclusive Kit",
      ],
      commands: ["/antman — Custom Tool (10-day timer)"],
      pvpKit: ["Diamond Armor Set — fully enchanted"],
    },
    {
      id: "god",
      name: "GOD",
      badge: "ELITE",
      color: "text-amber-400",
      glowColor: "group-hover:bg-amber-500/10",
      priceInr: "₹899",
      priceUsd: "$9.42",
      tag: "[GOD]",
      perks: [
        "Chat Prefix: [GOD]",
        "8 Homes (/sethome)",
        "8 Personal Vaults",
        "Unlimited Claim Fly",
        "Free Claim Blocks every 15 days",
        "GOD Exclusive Kit",
      ],
      commands: ["/anvil", "/grindstone", "/enderchest", "/recipe", "/smithingtable", "/stonecutter", "/claimblocks"],
      pvpKit: ["Netherite Armor Set — semi-fully enchanted"],
    },
    {
      id: "nex",
      name: "NEX",
      badge: "ULTIMATE",
      color: "text-[#ff4545]",
      glowColor: "group-hover:bg-[#ff2e2e]/10",
      priceInr: "₹1199",
      priceUsd: "$12.56",
      tag: "[NEX]",
      perks: [
        "Chat Prefix: [NEX]",
        "10 Homes (/sethome)",
        "10 Personal Vaults",
        "Unlimited Claim Fly",
        "Free Claim Blocks every 15 days",
        "NEX Exclusive Kit",
      ],
      commands: ["/anvil", "/grindstone", "/enderchest", "/recipe", "/smithingtable", "/stonecutter", "/claimblocks"],
      pvpKit: ["Netherite Armor Set — fully enchanted"],
    },
    {
      id: "custom",
      name: "CUSTOM",
      badge: "BESPOKE",
      color: "text-pink-400",
      glowColor: "group-hover:bg-pink-500/10",
      priceInr: "₹1899",
      priceUsd: "$19.79",
      tag: "[CUSTOM]",
      perks: [
        "Fully custom chat name & color",
        "10 Homes, 20 Personal Vaults",
        "Unlimited Claim Fly",
        "Free Claim Blocks every 15 days",
        "Custom Kit, built to your spec",
        "2x OP Tools included",
      ],
      commands: ["Custom / no-OP commands — built on request"],
      pvpKit: ["Fully custom enchanted armor — e.g. Protection V, Thorns IV, your pick"],
    },
  ];

  const openBuyModal = (rank: Rank) => {
    setBuyRank(rank);
    setUsername("");
    setAgreed(false);
    setCheckoutError("");
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyRank) return;

    if (!USERNAME_PATTERN.test(username)) {
      setCheckoutError("That doesn't look like a valid Minecraft username (3-16 characters, letters/numbers/underscore).");
      return;
    }
    if (!agreed) {
      setCheckoutError("Confirm your username's right before continuing — we can't undo a wrong delivery.");
      return;
    }

    setCheckoutError("");
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/tebex/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, rankId: buyRank.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) {
        setCheckoutError(data.error || "Couldn't start checkout — try again.");
        setCheckoutLoading(false);
        return;
      }
      window.location.href = data.checkoutUrl;
    } catch {
      setCheckoutError("Connection hiccup — check your internet and try again.");
      setCheckoutLoading(false);
    }
  };

  const openCustomTicket = () => {
    setCustomTicketOpen(true);
    setCustomUsername("");
    setCustomPlatform("java");
    setCustomRequest("");
    setCustomTicketError("");
  };

  const handleCustomTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUsername.trim()) {
      setCustomTicketError("Enter your Minecraft username so staff know who's asking.");
      return;
    }
    if (!customRequest.trim()) {
      setCustomTicketError("Describe what you want in the CUSTOM rank (tag color, armor enchants, kit, etc).");
      return;
    }

    const summary = [
      "NexCoreMC — CUSTOM Rank Request",
      `Username: ${customUsername.trim()}`,
      `Platform: ${customPlatform === "java" ? "Java" : "Bedrock / Pocket Edition"}`,
      `Request: ${customRequest.trim()}`,
    ].join("\n");

    navigator.clipboard.writeText(summary).catch(() => {});
    window.open(DISCORD_URL, "_blank", "noopener,noreferrer");
    setCustomTicketOpen(false);
  };

  return (
    <section id="store" className="py-28 lg:py-32 relative z-10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="rounded-full inline-flex items-center gap-2 px-3.5 py-2 bg-[#ff2e2e]/10 border border-[#ff2e2e]/20 text-[#ff4545] text-sm font-medium mb-5">
            Network store
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Server ranks &<br />
            <span className="text-[#ff4545]">VIP packs</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Fuel the network, skip the grind — extra homes, vault space, and kit perks that actually matter.
          </p>

          {/* Currency Toggle Switcher */}
          <div className="rounded-full mt-8 inline-flex items-center gap-3 p-1.5 bg-white/[0.04] border border-white/[0.08]">
            <span className="text-xs text-zinc-500 pl-2">Currency</span>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrency("inr")}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors cursor-pointer ${
                  currency === "inr"
                    ? "bg-[#ff2e2e] text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                INR (₹)
              </button>
              <button
                onClick={() => setCurrency("usd")}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors cursor-pointer ${
                  currency === "usd"
                    ? "bg-[#ff2e2e] text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </motion.div>

        {/* Ranks Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ranks.map((rank, index) => (
            <motion.div
              key={rank.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className="rounded-2xl bg-[#111114]/90 border border-white/[0.08] p-7 transition-colors duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`rounded-full text-xs font-semibold px-3 py-1 bg-white/[0.04] border border-white/[0.08] ${rank.color}`}>
                    {rank.badge}
                  </span>
                  <Crown className={`w-5 h-5 ${rank.color} group-hover:rotate-12 transition-transform`} />
                </div>

                <div className="mb-4">
                  <h3 className={`font-heading text-xl font-bold ${rank.color}`}>
                    {rank.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-extrabold font-mono text-white">
                      {currency === "inr" ? rank.priceInr : rank.priceUsd}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">/ month</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5 font-mono">
                    {currency === "inr" ? `or ${rank.priceUsd} USD` : `or ${rank.priceInr} INR`}
                  </div>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-white/[0.06] mb-6">
                  {rank.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff2e2e] shrink-0 mt-1.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-2.5">
                <button
                  onClick={() => setSelectedRank(rank)}
                  className="rounded-full w-full py-2.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-sm font-semibold text-zinc-200 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect kit</span>
                </button>

                {rank.id === "custom" ? (
                  <button
                    onClick={openCustomTicket}
                    className="rounded-full w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-sm font-semibold text-white flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Request custom rank</span>
                  </button>
                ) : (
                  <button
                    onClick={() => openBuyModal(rank)}
                    className="rounded-full w-full py-2.5 bg-[#ff2e2e] hover:bg-[#ff4545] text-sm font-semibold text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>Buy now</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rank Matrix Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-[#111114]/90 border border-white/[0.08] p-6 sm:p-8 overflow-x-auto"
        >
          <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-heading text-lg font-bold text-white">
              Rank comparison
            </h3>
            <span className="text-xs text-zinc-400 font-mono">All 6 tiers</span>
          </div>

          <table className="w-full text-left text-xs border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 text-xs font-semibold">
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-3 text-emerald-400">VIP+</th>
                <th className="py-3 px-3 text-blue-400">CORE</th>
                <th className="py-3 px-3 text-cyan-400">BOSS</th>
                <th className="py-3 px-3 text-amber-400">GOD</th>
                <th className="py-3 px-3 text-[#ff4545]">NEX</th>
                <th className="py-3 px-3 text-pink-400">CUSTOM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-zinc-300">
              <tr>
                <td className="py-3 px-4 font-semibold text-white">Monthly Price</td>
                <td className="py-3 px-3 font-mono">{currency === "inr" ? "₹129" : "$1.35"}</td>
                <td className="py-3 px-3 font-mono">{currency === "inr" ? "₹249" : "$2.61"}</td>
                <td className="py-3 px-3 font-mono">{currency === "inr" ? "₹459" : "$4.81"}</td>
                <td className="py-3 px-3 font-mono">{currency === "inr" ? "₹899" : "$9.42"}</td>
                <td className="py-3 px-3 font-mono">{currency === "inr" ? "₹1199" : "$12.56"}</td>
                <td className="py-3 px-3 font-mono">{currency === "inr" ? "₹1899" : "$19.79"}</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Homes (/sethome)</td>
                <td className="py-3 px-3 font-mono">5</td>
                <td className="py-3 px-3 font-mono">6</td>
                <td className="py-3 px-3 font-mono">7</td>
                <td className="py-3 px-3 font-mono">8</td>
                <td className="py-3 px-3 font-mono">10</td>
                <td className="py-3 px-3 font-mono">10</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Personal Vaults</td>
                <td className="py-3 px-3 font-mono">3</td>
                <td className="py-3 px-3 font-mono">4</td>
                <td className="py-3 px-3 font-mono">5</td>
                <td className="py-3 px-3 font-mono">8</td>
                <td className="py-3 px-3 font-mono">10</td>
                <td className="py-3 px-3 font-mono">20</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Claim Fly Duration</td>
                <td className="py-3 px-3 font-mono">10 min</td>
                <td className="py-3 px-3 font-mono">20 min</td>
                <td className="py-3 px-3 font-mono">20 min</td>
                <td className="py-3 px-3 text-amber-400 font-mono">∞</td>
                <td className="py-3 px-3 text-[#ff4545] font-mono">∞</td>
                <td className="py-3 px-3 text-pink-400 font-mono">∞</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Free Claim Blocks</td>
                <td className="py-3 px-3 text-zinc-500">-</td>
                <td className="py-3 px-3 text-zinc-500">-</td>
                <td className="py-3 px-3 text-zinc-500">-</td>
                <td className="py-3 px-3 text-amber-400">Every 15 days</td>
                <td className="py-3 px-3 text-[#ff4545]">Every 15 days</td>
                <td className="py-3 px-3 text-pink-400">Every 15 days</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Armour Kit</td>
                <td className="py-3 px-3 text-emerald-400">Diamond (half ench.)</td>
                <td className="py-3 px-3 text-blue-400">Diamond (better ench.)</td>
                <td className="py-3 px-3 text-cyan-400">Diamond (full ench.)</td>
                <td className="py-3 px-3 text-amber-400">Netherite (semi-full)</td>
                <td className="py-3 px-3 text-[#ff4545]">Netherite (full ench.)</td>
                <td className="py-3 px-3 text-pink-400">Fully custom</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Rank Kit & Lore Inspection Modal */}
      <Dialog
        open={!!selectedRank}
        onOpenChange={(open) => !open && setSelectedRank(null)}
      >
        {selectedRank && (
          <DialogContent className="rounded-2xl bg-[#111115] border border-white/10 text-white max-w-lg p-6 sm:p-8">
            <DialogHeader>
              <div className="flex items-center justify-between mb-2">
                <span className={`rounded-full text-xs font-semibold px-3 py-1 bg-white/[0.04] border border-white/[0.08] ${selectedRank.color}`}>
                  {selectedRank.badge}
                </span>
                <span className="font-mono text-sm text-zinc-400">
                  {currency === "inr" ? selectedRank.priceInr : selectedRank.priceUsd} / mo
                </span>
              </div>
              <DialogTitle className={`font-heading text-2xl font-bold ${selectedRank.color}`}>
                {selectedRank.name}
              </DialogTitle>
              <DialogDescription className="text-zinc-400 text-xs mt-1">
                Chat tag prefix: <span className="font-mono text-white font-bold">{selectedRank.tag}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <h4 className="text-xs font-semibold text-zinc-400 mb-2">
                  Commands
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRank.commands.map((cmd, i) => (
                    <span key={i} className="rounded-full px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] font-mono text-xs text-zinc-200">
                      {cmd}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-zinc-400 mb-2">
                  Armour kit
                </h4>
                <div className="rounded-xl bg-black/20 border border-white/[0.06] p-3.5 space-y-1.5 text-xs text-zinc-300">
                  {selectedRank.pvpKit.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff2e2e]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
              <span className="text-[11px] text-zinc-500">Non-P2W compliant</span>
              {selectedRank.id === "custom" ? (
                <button
                  onClick={() => {
                    setSelectedRank(null);
                    openCustomTicket();
                  }}
                  className="rounded-full px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white text-sm font-semibold cursor-pointer transition-all"
                >
                  Request this rank
                </button>
              ) : (
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-4 py-2.5 bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm font-semibold transition-colors"
                >
                  Join Discord for launch
                </a>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Tebex Checkout Modal */}
      <Dialog
        open={!!buyRank}
        onOpenChange={(open) => !open && !checkoutLoading && setBuyRank(null)}
      >
        {buyRank && (
          <DialogContent className="rounded-2xl bg-[#111115] border border-white/10 text-white max-w-md p-6 sm:p-8">
            <DialogHeader>
              <DialogTitle className={`font-heading text-xl font-bold ${buyRank.color}`}>
                {buyRank.name} checkout
              </DialogTitle>
              <DialogDescription className="text-zinc-400 text-xs mt-1">
                {currency === "inr" ? buyRank.priceInr : buyRank.priceUsd} / month · instant delivery, no restart needed
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                  Minecraft Java username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Notch"
                  maxLength={16}
                  disabled={checkoutLoading}
                  className="rounded-xl w-full px-4 py-3 bg-black/20 border border-white/[0.06] text-white placeholder-zinc-500 text-sm font-mono focus:outline-none focus:border-white/20 disabled:opacity-60"
                  autoFocus
                />
              </div>

              <label className="flex items-start gap-2.5 text-xs text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  disabled={checkoutLoading}
                  className="mt-0.5 accent-[#ff2e2e]"
                />
                <span>This is my exact IGN — ranks can&apos;t be transferred after delivery.</span>
              </label>

              {checkoutError && (
                <div className="rounded-xl p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>{checkoutError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={checkoutLoading}
                className="rounded-full w-full py-3 bg-[#ff2e2e] hover:bg-[#ff4545] text-white text-sm font-semibold cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 transition-colors"
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Starting checkout...</span>
                  </>
                ) : (
                  <span>Continue to Tebex</span>
                )}
              </button>

              <p className="text-[11px] text-zinc-500 text-center">
                Secure checkout via Tebex — your rank activates the moment payment clears.
              </p>
            </form>
          </DialogContent>
        )}
      </Dialog>

      {/* CUSTOM Rank Request Modal - builds a plaintext ticket summary,
          copies it to clipboard, and opens Discord so the player can
          paste it straight into a ticket for staff. */}
      <Dialog
        open={customTicketOpen}
        onOpenChange={(open) => setCustomTicketOpen(open)}
      >
        {customTicketOpen && (
          <DialogContent className="rounded-2xl bg-[#111115] border border-white/10 text-white max-w-md p-6 sm:p-8">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl font-bold text-pink-400">
                Custom rank request
              </DialogTitle>
              <DialogDescription className="text-zinc-400 text-xs mt-1">
                Tag color, kit, fully custom enchanted armor — built to your spec. We&apos;ll open a Discord ticket with the details below.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCustomTicketSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                  Minecraft username
                </label>
                <input
                  type="text"
                  value={customUsername}
                  onChange={(e) => setCustomUsername(e.target.value)}
                  placeholder="e.g. Notch"
                  maxLength={24}
                  className="rounded-xl w-full px-4 py-3 bg-black/20 border border-white/[0.06] text-white placeholder-zinc-500 text-sm font-mono focus:outline-none focus:border-white/20"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                  Platform
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomPlatform("java")}
                    className={`rounded-full py-2.5 text-sm font-semibold border transition-colors cursor-pointer ${
                      customPlatform === "java" ? "bg-pink-500/15 border-pink-500/30 text-pink-300" : "bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Java
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomPlatform("bedrock")}
                    className={`rounded-full py-2.5 text-sm font-semibold border transition-colors cursor-pointer ${
                      customPlatform === "bedrock" ? "bg-pink-500/15 border-pink-500/30 text-pink-300" : "bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Bedrock / Pocket
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                  What do you want?
                </label>
                <textarea
                  value={customRequest}
                  onChange={(e) => setCustomRequest(e.target.value)}
                  placeholder="e.g. Tag color #ff2e2e, custom kit with Protection V + Thorns IV netherite armor, custom name 'Nex'..."
                  rows={4}
                  className="rounded-xl w-full px-4 py-3 bg-black/20 border border-white/[0.06] text-white placeholder-zinc-500 text-xs leading-relaxed focus:outline-none focus:border-white/20 resize-none"
                />
              </div>

              {customTicketError && (
                <div className="rounded-xl p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>{customTicketError}</span>
                </div>
              )}

              <button
                type="submit"
                className="rounded-full w-full py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all"
              >
                <span>Copy details & open Discord</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <p className="text-[11px] text-zinc-500 text-center">
                Your request is copied to your clipboard — paste it into a new ticket in our Discord.
              </p>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
