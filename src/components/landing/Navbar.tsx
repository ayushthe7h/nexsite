"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Copy, Check, ExternalLink } from "lucide-react";
import { LiveStatusBadge } from "./LiveStatusBadge";
import { useToastNotification } from "./ToastContext";
import confetti from "canvas-confetti";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToastNotification();

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
    { label: "Home", href: "/#hero" },
    { label: "Game Modes", href: "/#modes" },
    { label: "How to Join", href: "/#how-to-join" },
    { label: "Features", href: "/#features" },
    { label: "Store", href: "/#store", badge: "SOON" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full h-[76px] z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#09090b]/92 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50"
          : "bg-gradient-to-b from-[#09090b]/80 to-transparent border-b border-white/5"
      }`}
    >
      <div className="max-w-[1240px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/#hero" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-9 h-9 flex items-center justify-center shrink-0"
          >
            <svg
              className="w-full h-full drop-shadow-[0_0_12px_rgba(255,46,46,0.45)] transition-transform duration-300"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="20,2 38,11 38,29 20,38 2,29 2,11"
                stroke="url(#nav-logo-grad)"
                strokeWidth="2.5"
                fill="rgba(15, 23, 42, 0.85)"
              />
              <path
                d="M15 15L25 25M25 15L15 25"
                stroke="#ff2e2e"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="20" cy="20" r="4" fill="#b91c1c" />
              <defs>
                <linearGradient id="nav-logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ff2e2e" />
                  <stop offset="1" stopColor="#b91c1c" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          <div className="flex flex-col">
            <span className="font-['Chakra_Petch'] text-xl font-bold tracking-tight text-white leading-none">
              NEXCORE<span className="text-[#ff2e2e]">MC</span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
              India Network
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-[#111115]/60 border border-white/5 backdrop-blur-md">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3.5 py-1.5 text-xs font-bold font-['Chakra_Petch'] tracking-wide text-zinc-300 hover:text-white hover:bg-white/8 rounded-lg transition-all flex items-center gap-1.5"
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#ff2e2e]/20 text-[#ff4545] border border-[#ff2e2e]/30">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
          <a
            href="https://discord.gg/7e6vX6EgFt"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 text-xs font-bold font-['Chakra_Petch'] tracking-wide text-zinc-300 hover:text-[#5865f2] hover:bg-[#5865f2]/15 rounded-lg transition-all flex items-center gap-1.5"
          >
            <span>Discord</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </nav>

        {/* Right Actions: Live Status + Copy IP Button */}
        <div className="hidden sm:flex items-center gap-3">
          <LiveStatusBadge compact />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCopyIP}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff2e2e] to-[#b91c1c] hover:from-[#ff4545] hover:to-[#dc2626] text-white text-xs font-bold font-['Chakra_Petch'] tracking-wide shadow-lg shadow-[#ff2e2e]/25 hover:shadow-[#ff2e2e]/45 transition-all duration-200 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-white/90 group-hover:scale-110 transition-transform" />
                <span>COPY IP</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5 rounded-lg bg-[#111115] border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 76px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-x-0 top-[76px] bg-[#09090b]/98 backdrop-blur-2xl border-t border-white/10 p-6 flex flex-col justify-between overflow-y-auto lg:hidden z-50"
          >
            <div className="flex flex-col gap-2.5">
              <div className="mb-2">
                <LiveStatusBadge />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl bg-[#111115] border border-white/5 text-zinc-200 font-bold font-['Chakra_Petch'] text-sm hover:text-white hover:border-[#ff2e2e]/30 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ff2e2e]/20 text-[#ff4545] border border-[#ff2e2e]/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}

              <Link
                href="/privacy"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-[#111115]/60 border border-white/5 text-zinc-400 font-medium text-xs hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-[#111115]/60 border border-white/5 text-zinc-400 font-medium text-xs hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={handleCopyIP}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff2e2e] to-[#b91c1c] text-white font-bold font-['Chakra_Petch'] text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#ff2e2e]/30"
              >
                <Copy className="w-4 h-4" />
                <span>COPY SERVER IP (nexcoremc.in)</span>
              </button>
              <a
                href="https://discord.gg/7e6vX6EgFt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold font-['Chakra_Petch'] text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#5865f2]/25"
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
