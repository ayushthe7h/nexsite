import React from "react";
import { ToastProvider } from "@/components/landing/ToastContext";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { StatsStrip } from "@/components/landing/StatsStrip";
import { GameModes } from "@/components/landing/GameModes";
import { HowToJoin } from "@/components/landing/HowToJoin";
import { Features } from "@/components/landing/Features";
import { DiscordBanner } from "@/components/landing/DiscordBanner";
import { StoreRanks } from "@/components/landing/StoreRanks";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <ToastProvider>
      <main className="min-h-screen bg-[#09090b] text-[#f4f4f6] relative selection:bg-[#ff2e2e]/30 selection:text-white">
        <Navbar />
        <Hero />
        <StatsStrip />
        <GameModes />
        <HowToJoin />
        <Features />
        <DiscordBanner />
        <StoreRanks />
        <FAQSection />
        <Footer />
      </main>
    </ToastProvider>
  );
}
