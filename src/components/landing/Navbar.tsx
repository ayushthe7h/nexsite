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
    showToast("Server IP copied", "nexcoremc.in (Port: 25565 Java / 25567 Bedrock)");

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
    { label: "How to Join", href: "/how-to-join" },
    { label: "Features", href: "/features" },
    { label: "Store", href: "/store" },
    { label: "Vote", href: "/vote" },
    { label: "Panel", href: "/panel", badge: "Staff" },
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
        className={`w-full h-[68px] sm:h-[72px] transition-all duration-300 border-b ${
          isScrolled
            ? "bg-[#09090b]/97 border-white/[0.08]"
            : "bg-[#09090b]/90 border-white/[0.04]"
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
                className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(255,46,46,0.5)] group-hover:scale-105 transition-transform"
                priority
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-['Chakra_Petch'] text-xl font-bold tracking-tight text-white leading-none">
                NEXCORE<span className="text-[#ff2e2e]">MC</span>
              </span>
              <span className="text-[10px] tracking-wide text-zinc-500">
                India Network
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-sm transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full text-[10px] font-medium px-1.5 py-0.5 bg-[#ff2e2e]/15 text-[#ff4545]">
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
              className="px-3.5 py-1.5 rounded-full text-sm text-zinc-400 hover:text-[#5865f2] transition-colors flex items-center gap-1.5"
            >
              <span>Discord</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </nav>

          {/* Right Actions: Live Status Badge + Copy IP Button */}
          <div className="hidden sm:flex items-center gap-3">
            <LiveStatusBadge compact />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopyIP}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ff2e2e] hover:bg-[#ff4545] text-white text-sm font-semibold cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy IP</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white transition-colors"
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
            className="fixed inset-x-0 top-[108px] bg-[#09090b]/98 border-t border-white/[0.08] p-6 flex flex-col justify-between overflow-y-auto lg:hidden z-50"
          >
            <div className="flex flex-col gap-2">
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
                    className={`rounded-xl px-4 py-3 text-sm transition-colors flex items-center justify-between border ${
                      isActive
                        ? "bg-[#ff2e2e]/10 border-[#ff2e2e]/30 text-white"
                        : "bg-white/[0.03] border-white/10 text-zinc-300 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="rounded-full text-[10px] font-medium px-2 py-0.5 bg-[#ff2e2e]/15 text-[#ff4545]">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              <Link
                href="/privacy"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-2.5 bg-white/[0.02] border border-white/[0.06] text-zinc-500 text-sm hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-2.5 bg-white/[0.02] border border-white/[0.06] text-zinc-500 text-sm hover:text-white transition-colors"
              >
                Terms &amp; Conditions
              </Link>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={handleCopyIP}
                className="w-full py-3.5 rounded-xl bg-[#ff2e2e] hover:bg-[#ff4545] text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Copy server IP</span>
              </button>
              <a
                href="https://discord.gg/nexcoremc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Join official Discord</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
