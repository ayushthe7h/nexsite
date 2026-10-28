"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Copy, Check, ExternalLink } from "lucide-react";
import { TopServerBar } from "./TopServerBar";
import { LiveStatusBadge } from "./LiveStatusBadge";
import { useToastNotification } from "./ToastContext";
import confetti from "canvas-confetti";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToastNotification();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyIP = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("nexcoremc.in");
    setCopied(true);
    showToast("Server IP Copied!", "nexcoremc.in (Port: 25565 Java / 25567 Bedrock)");

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.1, x: 0.9 },
      colors: ["#ff2e2e", "#b91c1c", "#ffffff"],
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Game Modes", href: "/modes" },
    { label: "How to Join", href: "/how-to-join" },
    { label: "Features", href: "/features" },
    { label: "Store", href: "/store", badge: "SOON" },
    { label: "Vote", href: "/vote" },
    { label: "FAQ", href: "/faq" },
    { label: "Uptime", href: "/uptime" },
    { label: "Panel", href: "/panel", badge: "STAFF" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50"
    >
      {/* Top Server Status Telemetry Bar */}
      <TopServerBar />

      {/* Main Navbar */}
      <div
        className={`w-full h-[68px] sm:h-[72px] transition-all duration-300 border-b-2 ${
          isScrolled
            ? "bg-[#0d0806]/97 border-[#ff2e2e]/25"
            : "bg-[#0d0806]/90 border-[#ff2e2e]/10"
        }`}
      >
        <div className="max-w-[1240px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 flex items-center justify-center shrink-0"
            >
              <Image
                src="/logo.png"
                alt="NexCore MC Official Logo"
                width={42}
                height={42}
                className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(255,46,46,0.6)] group-hover:scale-105 transition-transform"
                priority
                style={{ imageRendering: "pixelated" }}
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-['Chakra_Petch'] text-xl font-bold tracking-tight text-white leading-none">
                NEXCORE<span className="text-[#ff2e2e]">MC</span>
              </span>
              <span className="text-[9px] font-pixel tracking-wide text-zinc-500 uppercase">
                India Network
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 mc-panel-sunken bg-[#15100c]">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 text-[10px] font-pixel tracking-wide transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "mc-outline bg-[#ff2e2e]/20 text-white"
                      : "text-zinc-300 hover:text-white hover:bg-white/8"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="mc-outline text-[8px] font-pixel px-1.5 py-0.5 bg-[#ff2e2e]/20 text-[#ff4545]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <a
              href="https://discord.gg/nexcoremc"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-[10px] font-pixel tracking-wide text-zinc-300 hover:text-[#5865f2] hover:bg-[#5865f2]/15 transition-all flex items-center gap-1.5"
            >
              <span>Discord</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </nav>

          {/* Right Actions: Live Status Badge + Copy IP Button */}
          <div className="hidden sm:flex items-center gap-3">
            <LiveStatusBadge compact />
            <button
              onClick={handleCopyIP}
              className="mc-btn group relative inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#ff2e2e] to-[#b91c1c] hover:from-[#ff4545] hover:to-[#dc2626] text-white text-[10px] font-pixel cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-white/90" />
                  <span>COPY IP</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mc-btn p-2.5 bg-[#15100c] text-zinc-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 110px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-x-0 top-[108px] bg-[#0d0806]/98 border-t-2 border-[#ff2e2e]/20 p-6 flex flex-col justify-between overflow-y-auto lg:hidden z-50 bg-pixel-noise"
          >
            <div className="flex flex-col gap-2.5">
              <div className="mb-2">
                <LiveStatusBadge />
              </div>

              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`mc-outline px-4 py-3 font-pixel text-[10px] transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-[#ff2e2e]/15 text-white"
                        : "bg-[#15100c] text-zinc-200 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="mc-outline text-[8px] font-pixel px-2 py-0.5 bg-[#ff2e2e]/20 text-[#ff4545]">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              <Link
                href="/privacy"
                onClick={() => setMobileOpen(false)}
                className="mc-outline px-4 py-2.5 bg-[#15100c]/60 text-zinc-400 font-medium text-xs hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                onClick={() => setMobileOpen(false)}
                className="mc-outline px-4 py-2.5 bg-[#15100c]/60 text-zinc-400 font-medium text-xs hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={handleCopyIP}
                className="mc-btn w-full py-4 bg-gradient-to-r from-[#ff2e2e] to-[#b91c1c] text-white font-pixel text-[10px] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>COPY SERVER IP</span>
              </button>
              <a
                href="https://discord.gg/nexcoremc"
                target="_blank"
                rel="noopener noreferrer"
                className="mc-btn w-full py-4 bg-[#5865f2] hover:bg-[#4752c4] text-white font-pixel text-[10px] flex items-center justify-center gap-2"
              >
                <span>JOIN OFFICIAL DISCORD</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
