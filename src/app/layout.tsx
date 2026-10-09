import type { Metadata } from "next";
import { Chakra_Petch, Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const chakraPetch = Chakra_Petch({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexCoreMC - India's Premier Minecraft Network | Survival SMP, Bedwars & Practice",
  description:
    "Join India's dedicated Minecraft network (nexcoremc.in). Experience low-latency Mumbai hosting, Survival SMP, Bedwars, Practice PvP, and custom gamemodes.",
  authors: [{ name: "NexCoreMC Network" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[#09090b] text-[#f4f4f6] selection:bg-[#ff2e2e]/30 selection:text-white flex flex-col">
        <SmoothScrollProvider>
          <TooltipProvider delay={150}>
            {children}
          </TooltipProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
