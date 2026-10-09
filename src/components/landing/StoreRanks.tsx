"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Check, ExternalLink, ShieldCheck, Eye, Zap, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Rank {
  id: string;
  name: string;
  badge: string;
  color: string;
  borderColor: string;
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

  const ranks: Rank[] = [
    {
      id: "vip",
      name: "VIP+",
      badge: "ENTRY TIER",
      color: "text-emerald-400",
      borderColor: "hover:border-emerald-500/50",
      glowColor: "group-hover:bg-emerald-500/10",
      priceInr: "₹129",
      priceUsd: "$1.35",
      tag: "[VIP+]",
      perks: [
        "Chat Prefix: [VIP+]",
        "Priority Server Queue bypass",
        "2x /sethome slots (Total: 3)",
        "+2 Auction House listing slots",
        "Access to /fly in Hub & Lobby",
      ],
      commands: ["/fly", "/workbench", "/feed", "/hat"],
      pvpKit: [
        "Full Protection II Iron Armor Set",
        "Sharpness II Iron Sword",
        "64x Cooked Beef",
        "2x Golden Apples",
      ],
    },
    {
      id: "core",
      name: "CORE",
      badge: "POPULAR",
      color: "text-blue-400",
      borderColor: "hover:border-blue-500/50",
      glowColor: "group-hover:bg-blue-500/10",
      priceInr: "₹249",
      priceUsd: "$2.61",
      tag: "[CORE]",
      perks: [
        "Chat Prefix: [CORE]",
        "Instant Server Queue bypass",
        "4x /sethome slots (Total: 5)",
        "+4 Auction House listing slots",
        "Access to /craft & /enderchest",
        "Custom Death Message broadcast",
      ],
      commands: ["/ec", "/craft", "/near", "/fly (Hub)", "/feed"],
      pvpKit: [
        "Full Protection III Diamond Armor Set",
        "Sharpness III Diamond Sword",
        "Power II Bow + 64x Arrows",
        "4x Golden Apples",
      ],
    },
    {
      id: "boss",
      name: "BOSS",
      badge: "TIER 3",
      color: "text-cyan-400",
      borderColor: "hover:border-cyan-500/50",
      glowColor: "group-hover:bg-cyan-500/10",
      priceInr: "₹459",
      priceUsd: "$4.81",
      tag: "[BOSS]",
      perks: [
        "Chat Prefix: [BOSS]",
        "Full Priority Slot Access",
        "7x /sethome slots (Total: 8)",
        "+8 Auction House listing slots",
        "Access to /anvil & /heal (cooldown)",
        "Special Boss particle trail",
      ],
      commands: ["/anvil", "/heal", "/ptime", "/pweather", "/ec"],
      pvpKit: [
        "Full Protection IV Diamond Armor Set",
        "Sharpness IV Fire Aspect I Sword",
        "Power III Bow + 64x Arrows",
        "8x Golden Apples + 1x Enchanted GApple",
      ],
    },
    {
      id: "god",
      name: "GOD",
      badge: "ELITE",
      color: "text-amber-400",
      borderColor: "hover:border-amber-500/50",
      glowColor: "group-hover:bg-amber-500/10",
      priceInr: "₹899",
      priceUsd: "$9.42",
      tag: "[GOD]",
      perks: [
        "Chat Prefix: [GOD]",
        "Unrestricted Server Slot Access",
        "12x /sethome slots (Total: 13)",
        "+15 Auction House listing slots",
        "Access to /condense & /extinguish",
        "Custom Discord VIP Role sync",
      ],
      commands: ["/condense", "/ext", "/repair hand", "/god (Lobby)", "/anvil"],
      pvpKit: [
        "Full Protection IV Netherite Armor Set",
        "Sharpness V Netherite Sword",
        "Power IV Flame Bow + 64x Arrows",
        "16x Golden Apples + 2x Enchanted GApples",
      ],
    },
    {
      id: "nex",
      name: "NEX",
      badge: "ULTIMATE",
      color: "text-[#ff4545]",
      borderColor: "hover:border-[#ff2e2e]/60",
      glowColor: "group-hover:bg-[#ff2e2e]/10",
      priceInr: "₹1199",
      priceUsd: "$12.56",
      tag: "[NEX]",
      perks: [
        "Chat Prefix: [NEX]",
        "Master Network Access",
        "20x /sethome slots (Total: 21)",
        "+25 Auction House listing slots",
        "Access to /repair all (cooldown)",
        "Exclusive Animated Chat Color tag",
      ],
      commands: ["/repair all", "/fly (SMP Claims)", "/nick", "/ptime", "/ec"],
      pvpKit: [
        "Full Godly Protection IV Unbreaking III Netherite Armor",
        "Sharpness V Fire Aspect II Knockback II Netherite Sword",
        "Power V Infinity Bow",
        "32x Golden Apples + 4x Enchanted GApples",
      ],
    },
    {
      id: "custom",
      name: "CUSTOM",
      badge: "BESPOKE",
      color: "text-pink-400",
      borderColor: "hover:border-pink-500/50",
      glowColor: "group-hover:bg-pink-500/10",
      priceInr: "₹1899",
      priceUsd: "$19.79",
      tag: "[CUSTOM]",
      perks: [
        "Custom Tag Name & Hex Color in Chat",
        "All NEX tier perks included",
        "Unlimited /sethome slots",
        "Unlimited Auction House listings",
        "Direct Discord Developer Channel access",
        "Permanent Custom Rank Trophy in Hub",
      ],
      commands: ["/customtag", "/customcolor", "/repair all", "/fly", "/nick"],
      pvpKit: [
        "Fully Custom Enchanted Armor Set with Player Name Tag",
        "Custom Named Netherite Sword & Bow",
        "64x Golden Apples + 8x Enchanted GApples",
      ],
    },
  ];

  return (
    <section id="store" className="py-28 lg:py-32 relative z-10 bg-[#0c0c10]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff2e2e]/10 border border-[#ff2e2e]/25 text-[#ff4545] text-xs font-bold font-['Chakra_Petch'] tracking-wider uppercase mb-4 shadow-sm">
            NETWORK STORE
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            SERVER RANKS & <span className="text-gradient-red">VIP PACKS</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Support network infrastructure and unlock convenience perks, vault expansions, and custom cosmetics.
          </p>

          {/* Currency Toggle Switcher */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-[#16161c] border border-white/10 shadow-xl">
            <span className="text-xs font-semibold text-zinc-400 pl-3">Currency:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrency("inr")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold font-['Chakra_Petch'] tracking-wider transition-all cursor-pointer ${
                  currency === "inr"
                    ? "bg-[#ff2e2e] text-white shadow-md shadow-[#ff2e2e]/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                INR (₹)
              </button>
              <button
                onClick={() => setCurrency("usd")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold font-['Chakra_Petch'] tracking-wider transition-all cursor-pointer ${
                  currency === "usd"
                    ? "bg-[#ff2e2e] text-white shadow-md shadow-[#ff2e2e]/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </motion.div>

        {/* Store Launch Notice */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="mb-12 p-4 rounded-xl bg-[#14141e] border border-[#ff2e2e]/30 flex items-center justify-between gap-4 max-w-2xl mx-auto text-xs text-zinc-300 shadow-lg"
        >
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[#ff2e2e] shrink-0" />
            <span>Store payment gateway is in final testing. Rank packages shown below preview live perk matrices.</span>
          </div>
          <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded bg-[#ff2e2e]/20 text-[#ff4545] border border-[#ff2e2e]/30">
            COMING SOON
          </span>
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
              whileHover={{ y: -4 }}
              className={`p-7 rounded-2xl bg-[#111115]/95 border border-white/10 ${rank.borderColor} transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-[#ff2e2e]/10 group relative overflow-hidden`}
            >
              {/* Subtle top glow highlight */}
              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity ${rank.color}`} />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold font-['Chakra_Petch'] px-3 py-1 rounded-full border border-white/10 bg-[#16161c] ${rank.color}`}>
                    {rank.badge}
                  </span>
                  <Crown className={`w-5 h-5 ${rank.color} group-hover:rotate-12 transition-transform`} />
                </div>

                <div className="mb-4">
                  <h3 className={`font-['Chakra_Petch'] text-2xl font-extrabold ${rank.color}`}>
                    {rank.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold font-mono text-white">
                      {currency === "inr" ? rank.priceInr : rank.priceUsd}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">/ month</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5 font-mono">
                    {currency === "inr" ? `or ${rank.priceUsd} USD` : `or ${rank.priceInr} INR`}
                  </div>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-white/5 mb-6">
                  {rank.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff2e2e] shrink-0 mt-1.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-col gap-2.5">
                <button
                  onClick={() => setSelectedRank(rank)}
                  className="w-full py-2.5 rounded-xl bg-[#181824] hover:bg-[#202030] border border-white/10 text-xs font-bold font-['Chakra_Petch'] text-zinc-200 tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>INSPECT KIT & COMMANDS</span>
                </button>

                <a
                  href="https://discord.gg/7e6vX6EgFt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#ff2e2e]/15 hover:bg-[#ff2e2e]/25 border border-[#ff2e2e]/30 text-xs font-bold font-['Chakra_Petch'] text-[#ff4545] tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>CLAIM ON DISCORD (SOON)</span>
                </a>
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
          className="p-6 sm:p-8 rounded-2xl bg-[#111115]/95 border border-white/10 overflow-x-auto shadow-xl"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-['Chakra_Petch'] text-xl font-bold text-white">
              RANK FEATURE COMPARISON MATRIX
            </h3>
            <span className="text-xs text-zinc-400 font-mono">All 6 Tiers</span>
          </div>

          <table className="w-full text-left text-xs border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 font-['Chakra_Petch'] uppercase tracking-wider">
                <th className="py-3 px-4">Feature / Benefit</th>
                <th className="py-3 px-3 text-emerald-400">VIP+</th>
                <th className="py-3 px-3 text-blue-400">CORE</th>
                <th className="py-3 px-3 text-cyan-400">BOSS</th>
                <th className="py-3 px-3 text-amber-400">GOD</th>
                <th className="py-3 px-3 text-[#ff4545]">NEX</th>
                <th className="py-3 px-3 text-pink-400">CUSTOM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
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
                <td className="py-3 px-4">Priority Server Queue</td>
                <td className="py-3 px-3 text-emerald-400">Yes</td>
                <td className="py-3 px-3 text-blue-400">Instant</td>
                <td className="py-3 px-3 text-cyan-400">Instant</td>
                <td className="py-3 px-3 text-amber-400">Bypass</td>
                <td className="py-3 px-3 text-[#ff4545]">Master</td>
                <td className="py-3 px-3 text-pink-400">Master</td>
              </tr>
              <tr>
                <td className="py-3 px-4">/sethome Slots</td>
                <td className="py-3 px-3 font-mono">3</td>
                <td className="py-3 px-3 font-mono">5</td>
                <td className="py-3 px-3 font-mono">8</td>
                <td className="py-3 px-3 font-mono">13</td>
                <td className="py-3 px-3 font-mono">21</td>
                <td className="py-3 px-3 font-mono">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Auction House Listings</td>
                <td className="py-3 px-3 font-mono">3 Slots</td>
                <td className="py-3 px-3 font-mono">5 Slots</td>
                <td className="py-3 px-3 font-mono">10 Slots</td>
                <td className="py-3 px-3 font-mono">18 Slots</td>
                <td className="py-3 px-3 font-mono">30 Slots</td>
                <td className="py-3 px-3 font-mono">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Portable /craft & /enderchest</td>
                <td className="py-3 px-3 text-zinc-500">-</td>
                <td className="py-3 px-3 text-emerald-400">Yes</td>
                <td className="py-3 px-3 text-emerald-400">Yes</td>
                <td className="py-3 px-3 text-emerald-400">Yes</td>
                <td className="py-3 px-3 text-emerald-400">Yes</td>
                <td className="py-3 px-3 text-emerald-400">Yes</td>
              </tr>
              <tr>
                <td className="py-3 px-4">/fly in Claimed Lands</td>
                <td className="py-3 px-3 text-zinc-500">-</td>
                <td className="py-3 px-3 text-zinc-500">-</td>
                <td className="py-3 px-3 text-zinc-500">-</td>
                <td className="py-3 px-3 text-zinc-500">-</td>
                <td className="py-3 px-3 text-[#ff4545]">Yes</td>
                <td className="py-3 px-3 text-pink-400">Yes</td>
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
          <DialogContent className="bg-[#111115] border border-white/10 text-white max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl">
            <DialogHeader>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold font-['Chakra_Petch'] px-3 py-1 rounded-full border border-white/10 bg-[#16161c] ${selectedRank.color}`}>
                  {selectedRank.badge}
                </span>
                <span className="font-mono text-sm text-zinc-400">
                  {currency === "inr" ? selectedRank.priceInr : selectedRank.priceUsd} / mo
                </span>
              </div>
              <DialogTitle className={`font-['Chakra_Petch'] text-2xl font-extrabold ${selectedRank.color}`}>
                {selectedRank.name} RANK SPECIFICATIONS
              </DialogTitle>
              <DialogDescription className="text-zinc-400 text-xs mt-1">
                Chat Tag Prefix: <span className="font-mono text-white font-bold">{selectedRank.tag}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <h4 className="text-xs font-bold font-['Chakra_Petch'] text-zinc-400 uppercase tracking-wider mb-2">
                  Commands Unlocked
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRank.commands.map((cmd, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-[#16161c] border border-white/10 font-mono text-xs text-zinc-200">
                      {cmd}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold font-['Chakra_Petch'] text-zinc-400 uppercase tracking-wider mb-2">
                  Monthly PvP & Survival Kit
                </h4>
                <div className="p-3.5 rounded-xl bg-[#16161c] border border-white/5 space-y-1.5 text-xs text-zinc-300">
                  {selectedRank.pvpKit.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff2e2e]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500">Non-P2W Compliant</span>
              <a
                href="https://discord.gg/7e6vX6EgFt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs font-bold font-['Chakra_Petch'] tracking-wider transition-colors"
              >
                JOIN DISCORD FOR LAUNCH
              </a>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
