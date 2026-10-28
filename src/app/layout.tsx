import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ToastProvider } from "@/components/landing/ToastContext";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "NexCoreMC - India's Premier Minecraft Network | Survival SMP, Bedwars & Practice",
  description:
    "Join India's dedicated Minecraft network (nexcoremc.in). Experience low-latency Mumbai hosting, Survival SMP, Bedwars, Practice PvP, and custom gamemodes.",
  authors: [{ name: "NexCoreMC Network" }],
  icons: {
    icon: "/logo.png",
  },
};

import { SiteSettingsProvider } from "@/components/providers/SiteSettingsContext";
import { SiteOverlay } from "@/components/landing/SiteOverlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0d0806] text-[#f4f4f6] selection:bg-[#ff2e2e]/30 selection:text-white flex flex-col font-sans bg-pixel-noise">
        <SmoothScrollProvider>
          <TooltipProvider delay={150}>
            <ToastProvider>
              <SiteSettingsProvider>
                <SiteOverlay />
                <Navbar />
                <div className="flex-1 flex flex-col">
                  {children}
                </div>
                <Footer />
              </SiteSettingsProvider>
            </ToastProvider>
          </TooltipProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
