"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";

export function FAQSection() {
  const faqs = [
    {
      id: "item-1",
      question: "What versions of Minecraft are supported?",
      answer:
        "NexCoreMC supports Minecraft Java Edition from versions 1.8.9 all the way up to the latest 1.20+ releases. Bedrock Edition / MCPE players can join on any recent version via port 25567.",
    },
    {
      id: "item-2",
      question: "How do I join from mobile (Minecraft PE / Bedrock)?",
      answer:
        "Open Minecraft on your phone, tablet, console, or Windows 10/11 edition. Go to Play > Servers tab > Add Server. Enter Server Address: nexcoremc.in and set Port to 25567. Click Save and Join!",
    },
    {
      id: "item-3",
      question: "What is the server address and latency?",
      answer:
        "The server address is nexcoremc.in (Java port 25565 / Bedrock port 25567). Our servers are hosted in Mumbai, India, delivering ultra-low 10-20ms latency to players in India and sub-50ms across Asia.",
    },
    {
      id: "item-4",
      question: "Is NexCoreMC pay-to-win (P2W)?",
      answer:
        "No. All ranks and cosmetics are strictly non-pay-to-win. Ranks grant convenience commands (like /sethome slots, /craft, /enderchest), cosmetic badges, chat tags, and extra vault storage. Combat damage and player health remain completely identical for all players.",
    },
    {
      id: "item-5",
      question: "How do I report hackers or submit a support ticket?",
      answer:
        "Join our official Discord server at discord.gg/nexcoremc and open a ticket in the #support channel. Our staff team reviews player reports with in-game logs and anti-cheat replay captures.",
    },
    {
      id: "item-6",
      question: "How do I protect my builds and items on Survival SMP?",
      answer:
        "We use the golden shovel land claiming system. Hold a golden shovel to select two opposite corners of your area to create a claim. Claimed land protects against griefing, stealing, fire spread, and explosions.",
    },
  ];

  return (
    <section id="faq" className="py-28 lg:py-32 relative z-10">
      <div className="max-w-[880px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="rounded-full inline-flex items-center gap-2 px-3.5 py-2 bg-[#ff2e2e]/10 border border-[#ff2e2e]/20 text-[#ff4545] text-sm font-medium mb-5">
            Help & knowledge base
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Frequently asked<br /><span className="text-[#ff4545]">questions</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about connecting, gameplay mechanics, and server rules.
          </p>
        </motion.div>

        {/* Accordion Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="rounded-2xl bg-[#111114]/90 border border-white/[0.08] p-6 sm:p-8"
        >
          <Accordion className="w-full space-y-3">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="rounded-xl bg-white/[0.03] border border-white/[0.08] px-5 transition-colors data-[state=open]:bg-white/[0.05]"
              >
                <AccordionTrigger className="text-left font-heading text-base font-semibold text-white hover:text-[#ff4545] hover:no-underline py-4 cursor-pointer">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-300 text-sm leading-relaxed pb-4 pt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <span>Still have questions or need technical help?</span>
            <a
              href="https://discord.gg/nexcoremc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#ff2e2e] hover:text-[#ff4545] font-semibold text-sm transition-colors"
            >
              <span>Open a Discord ticket</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
