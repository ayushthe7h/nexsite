"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";

interface Toast {
  id: string;
  title: string;
  message: string;
}

interface ToastContextType {
  showToast: (title: string, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="pointer-events-auto flex items-start gap-3.5 p-4 rounded-xl bg-[#111115]/95 border border-[#ff2e2e]/30 backdrop-blur-xl shadow-2xl shadow-black/80 text-white"
            >
              <div className="w-8 h-8 rounded-lg bg-[#ff2e2e]/15 border border-[#ff2e2e]/40 flex items-center justify-center text-[#ff2e2e] shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="text-sm font-bold font-['Chakra_Petch'] text-white">
                  {toast.title}
                </div>
                <div className="text-xs text-zinc-300 break-words leading-relaxed font-mono">
                  {toast.message}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToastNotification() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastNotification must be used within ToastProvider");
  }
  return context;
}
