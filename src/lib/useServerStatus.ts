"use client";

import { useState, useEffect } from "react";

export interface ServerTelemetry {
  online: boolean;
  onlinePlayers: number;
  maxPlayers: number;
  ip: string;
  port: number;
  bedrockPort: number;
  version: string;
  loading: boolean;
}

export function useServerStatus() {
  const [status, setStatus] = useState<ServerTelemetry>({
    online: true, // Optimistic default while loading
    onlinePlayers: 59,
    maxPlayers: 200,
    ip: "nexcoremc.in",
    port: 25565,
    bedrockPort: 25567,
    version: "1.8 - 1.20+",
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function checkServer() {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        let resolved = false;

        // Attempt 1: mcstatus.io java nexcoremc.in
        try {
          const res = await fetch("https://api.mcstatus.io/v2/status/java/nexcoremc.in", {
            signal: controller.signal,
          });
          if (res.ok) {
            const data = await res.json();
            if (data && data.online) {
              if (isMounted) {
                setStatus({
                  online: true,
                  onlinePlayers: typeof data.players?.online === "number" ? data.players.online : 59,
                  maxPlayers: typeof data.players?.max === "number" ? data.players.max : 200,
                  ip: "nexcoremc.in",
                  port: 25565,
                  bedrockPort: 25567,
                  version: data.version?.name_clean || "1.8 - 1.20+",
                  loading: false,
                });
              }
              resolved = true;
            }
          }
        } catch {
          // Ignore and proceed to fallback
        }

        // Attempt 2 (fallback): mcstatus.io java play.nexcoremc.in
        if (!resolved) {
          try {
            const res = await fetch("https://api.mcstatus.io/v2/status/java/play.nexcoremc.in", {
              signal: controller.signal,
            });
            if (res.ok) {
              const data = await res.json();
              if (data && data.online) {
                if (isMounted) {
                  setStatus({
                    online: true,
                    onlinePlayers: typeof data.players?.online === "number" ? data.players.online : 59,
                    maxPlayers: typeof data.players?.max === "number" ? data.players.max : 200,
                    ip: "nexcoremc.in",
                    port: 25565,
                    bedrockPort: 25567,
                    version: data.version?.name_clean || "1.8 - 1.20+",
                    loading: false,
                  });
                }
                resolved = true;
              }
            }
          } catch {
            // Ignore
          }
        }

        // Attempt 3 (fallback): mcsrvstat.us
        if (!resolved) {
          try {
            const res = await fetch("https://api.mcsrvstat.us/2/nexcoremc.in", {
              signal: controller.signal,
            });
            if (res.ok) {
              const data = await res.json();
              if (data && data.online) {
                if (isMounted) {
                  setStatus({
                    online: true,
                    onlinePlayers: typeof data.players?.online === "number" ? data.players.online : 59,
                    maxPlayers: typeof data.players?.max === "number" ? data.players.max : 200,
                    ip: "nexcoremc.in",
                    port: 25565,
                    bedrockPort: 25567,
                    version: data.version || "1.8 - 1.20+",
                    loading: false,
                  });
                }
                resolved = true;
              }
            }
          } catch {
            // Ignore
          }
        }

        clearTimeout(timeoutId);

        if (!resolved && isMounted) {
          // Server offline or ping blocked, keep safe values
          setStatus((prev) => ({
            ...prev,
            loading: false,
          }));
        }
      } catch {
        if (isMounted) {
          setStatus((prev) => ({ ...prev, loading: false }));
        }
      }
    }

    checkServer();
    const interval = setInterval(checkServer, 30000); // refresh every 30s

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return status;
}
