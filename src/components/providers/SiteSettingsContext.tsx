"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { SiteSettings, DEFAULT_SETTINGS, mergeWithDefaults } from "@/lib/site-settings-defaults";

export type { SiteSettings };

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSettings: () => void;
  staffBypassed: boolean;
  setStaffBypassed: (val: boolean) => void;
  // The passcode captured at login, forwarded with every write so the
  // server can verify it. null in guest/demo mode - which means writes
  // stay local-only and never touch the live database (see persist()).
  adminPasscode: string | null;
  setAdminPasscode: (code: string | null) => void;
  // True once settings have been confirmed to come from the real
  // database at least once (vs. defaults/localStorage fallback).
  isLive: boolean;
  saveError: string | null;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: DEFAULT_SETTINGS,
  updateSettings: () => {},
  resetSettings: () => {},
  staffBypassed: false,
  setStaffBypassed: () => {},
  adminPasscode: null,
  setAdminPasscode: () => {},
  isLive: false,
  saveError: null,
});

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

// How often every open tab re-checks the live settings, so a maintenance
// toggle (or banner change) reaches visitors who already have the site
// open, without them needing to refresh.
const POLL_MS = 25_000;

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [staffBypassed, setStaffBypassed] = useState<boolean>(false);
  const [adminPasscode, setAdminPasscodeState] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Lets updateSettings() read the latest settings without needing to be
  // recreated every render (avoids stale-closure bugs with setInterval etc).
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      if (!res.ok) return;
      const json = await res.json();
      const merged = mergeWithDefaults(json.settings);
      setSettings(merged);
      setIsLive(Boolean(json.persisted));
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("nexcore_site_settings", JSON.stringify(merged));
        } catch {
          // Ignore
        }
      }
    } catch {
      // Network hiccup - keep whatever's already showing (localStorage
      // cache from a previous successful fetch, or the defaults).
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Instant local cache so there's no flash of defaults before the
    // network round-trip to /api/settings resolves.
    try {
      const stored = localStorage.getItem("nexcore_site_settings");
      if (stored) setSettings(mergeWithDefaults(JSON.parse(stored)));
    } catch {
      // Ignore
    }

    try {
      const isAuth = localStorage.getItem("nexcore_panel_auth");
      if (isAuth === "true") setStaffBypassed(true);

      const savedPasscode = localStorage.getItem("nexcore_panel_passcode");
      if (savedPasscode) setAdminPasscodeState(savedPasscode);
    } catch {
      // Ignore
    }

    // Get the real, shared settings as soon as possible, then keep
    // polling so this stays accurate without a manual refresh.
    fetchSettings();
    const interval = setInterval(fetchSettings, POLL_MS);

    // Still useful for same-browser multi-tab: an update in one tab
    // reaches the others instantly instead of waiting for the next poll.
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "nexcore_site_settings" && e.newValue) {
        try {
          setSettings(mergeWithDefaults(JSON.parse(e.newValue)));
        } catch {
          // Ignore parse errors
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [fetchSettings]);

  const setAdminPasscode = (code: string | null) => {
    setAdminPasscodeState(code);
    if (typeof window !== "undefined") {
      try {
        if (code) localStorage.setItem("nexcore_panel_passcode", code);
        else localStorage.removeItem("nexcore_panel_passcode");
      } catch {
        // Ignore
      }
    }
  };

  // Sends the full merged settings object to the live database. Only
  // runs when a real staff passcode is on hand - guest/demo mode never
  // reaches the network, so it can never deface the live site.
  const persist = useCallback(
    async (next: SiteSettings) => {
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("nexcore_site_settings", JSON.stringify(next));
        } catch {
          // Ignore
        }
      }

      if (!adminPasscode) return;

      try {
        const res = await fetch("/api/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ passcode: adminPasscode, settings: next }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setSaveError(data.error || "Couldn't save — try again.");
        } else {
          setSaveError(null);
          setIsLive(true);
        }
      } catch {
        setSaveError("Network error — couldn't reach the server.");
      }
    },
    [adminPasscode]
  );

  const updateSettings = (partial: Partial<SiteSettings>) => {
    const next = { ...settingsRef.current, ...partial };
    setSettings(next);
    persist(next);
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    persist(DEFAULT_SETTINGS);
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        staffBypassed,
        setStaffBypassed,
        adminPasscode,
        setAdminPasscode,
        isLive,
        saveError,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}
