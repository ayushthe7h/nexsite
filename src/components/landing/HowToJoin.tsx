"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, Copy, Check, Play, Server, Plus, Sparkles } from "lucide-react";
import { useToastNotification } from "./ToastContext";
import confetti from "canvas-confetti";

export function HowToJoin() {
  const [activeTab, setActiveTab] = useState<"java" | "bedrock">("java");
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrock, setCopiedBedrock] = useState(false);
  const { showToast } = useToastNotification();

  const handleCopyJava = () => {
    navigator.clipboard.writeText("nexcoremc.in");
    setCopiedJava(true);
    showToast("Java Server IP Copied!", "nexcoremc.in (Default Port: 25565)");

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ff2e2e", "#b91c1c", "#ffffff"],
    });

    setTimeout(() => setCopiedJava(false), 2000);
  };

  const handleCopyBedrock = () => {
    navigator.clipboard.writeText("nexcoremc.in:25567");
    setCopiedBedrock(true);
    showToast("Bedrock Details Copied!", "IP: nexcoremc.in | Port: 25567");

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ff2e2e", "#b91c1c", "#ffffff"],
    });

    setTimeout(() => setCopiedBedrock(false), 2000);
  };

  const javaSteps = [
    {
      step: "01",
      title: "Launch Minecraft Java",
      desc: "Open your Minecraft Launcher and start version 1.8 up to 1.20+.",
      icon: Play,
    },
    {
      step: "02",
      title: "Select Multiplayer",
      desc: "From the main title menu, click Multiplayer and then click 'Add Server'.",
      icon: Server,
    },
    {
      step: "03",
      title: "Enter Server Address",
      desc: "Set Server Name to 'NexCoreMC' and enter server address: nexcoremc.in",
      icon: Plus,
    },
    {
      step: "04",
      title: "Connect & Play",
      desc: "Click 'Done' and double-click the server or press 'Join Server' to enter.",
      icon: Sparkles,
    },
  ];

  const bedrockSteps = [
    {
      step: "01",
      title: "Open Minecraft Bedrock / MCPE",
      desc: "Launch Minecraft on Android, iOS, Windows 10/11, or console.",
      icon: Play,
    },
    {
      step: "02",
      title: "Navigate to Servers Tab",
      desc: "Press 'Play', click on the 'Servers' tab, and scroll to 'Add Server'.",
      icon: Server,
    },
    {
      step: "03",
      title: "Enter IP & Port 25567",
      desc: "Server Address: nexcoremc.in | Server Port: 25567 (Required)",
      icon: Plus,
    },
    {
      step: "04",
      title: "Save & Connect",
      desc: "Click 'Save' or 'Play' to connect instantly from your mobile or console device.",
      icon: Sparkles,
    },
  ];

  const steps = activeTab === "java" ? javaSteps : bedrockSteps;

  return (
    <section id="how-to-join" className="py-28 lg:py-32 relative z-10 bg-[#0d0806]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="mc-outline inline-flex items-center gap-2 px-3.5 py-2 bg-[#ff2e2e]/10 text-[#ff4545] text-[9px] font-pixel tracking-wide uppercase mb-5">
            Connection Guide
          </div>
          <h2 className="font-pixel text-lg sm:text-2xl text-white leading-[1.8] mb-4">
            HOW TO<br /><span className="text-[#ff4545]">JOIN NEXCOREMC</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Connect in under 60 seconds with full cross-play support for PC, Mobile, and Console.
          </p>
        </motion.div>

        {/* Edition Selector Tabs */}
        <div className="flex justify-center mb-12">
          <div className="mc-panel-sunken p-1.5 bg-[#15100c] inline-flex gap-2">
            <button
              onClick={() => setActiveTab("java")}
              className={`mc-outline relative flex items-center gap-2.5 px-6 py-3 font-pixel text-[9px] transition-all duration-200 cursor-pointer ${
                activeTab === "java"
                  ? "bg-gradient-to-r from-[#ff2e2e] to-[#b91c1c] text-white"
                  : "bg-[#1f1712] text-zinc-400 hover:text-white"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>JAVA (PC)</span>
            </button>

            <button
              onClick={() => setActiveTab("bedrock")}
              className={`mc-outline relative flex items-center gap-2.5 px-6 py-3 font-pixel text-[9px] transition-all duration-200 cursor-pointer ${
                activeTab === "bedrock"
                  ? "bg-gradient-to-r from-[#ff2e2e] to-[#b91c1c] text-white"
                  : "bg-[#1f1712] text-zinc-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>BEDROCK / MCPE</span>
            </button>
          </div>
        </div>

        {/* Stepper Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="mc-panel relative p-6 bg-[#1a120f] hover:bg-[#201712] transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-pixel text-xl text-[#ff2e2e]">
                        {step.step}
                      </span>
                      <div className="mc-outline w-11 h-11 bg-[#15100c] flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                    <span>Step {idx + 1} of 4</span>
                    <span className="w-1.5 h-1.5 bg-[#ff2e2e]" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Quick Connection Action Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mc-panel p-6 sm:p-8 bg-[#1a120f] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="mc-outline w-12 h-12 bg-[#ff2e2e]/15 flex items-center justify-center text-[#ff2e2e] shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[9px] font-pixel text-zinc-400 uppercase tracking-wide">
                {activeTab === "java" ? "Java Server Address" : "Bedrock Address & Port"}
              </div>
              <div className="text-xl sm:text-2xl font-mono font-extrabold text-white mt-1">
                {activeTab === "java" ? "nexcoremc.in" : "nexcoremc.in : 25567"}
              </div>
            </div>
          </div>

          <div className="flex gap-3 shrink-0 w-full md:w-auto">
            {activeTab === "java" ? (
              <button
                onClick={handleCopyJava}
                className="mc-btn w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#ff2e2e] to-[#b91c1c] hover:from-[#ff4545] hover:to-[#dc2626] text-white text-[9px] font-pixel cursor-pointer"
              >
                {copiedJava ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedJava ? "COPIED" : "COPY JAVA IP"}</span>
              </button>
            ) : (
              <button
                onClick={handleCopyBedrock}
                className="mc-btn w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#ff2e2e] to-[#b91c1c] hover:from-[#ff4545] hover:to-[#dc2626] text-white text-[9px] font-pixel cursor-pointer"
              >
                {copiedBedrock ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedBedrock ? "COPIED" : "COPY BEDROCK IP"}</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
