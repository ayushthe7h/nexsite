"use client";

import React, { useEffect, useRef, useState } from "react";
import type { SkinViewer } from "skinview3d";

// Renders a Minecraft username's skin as a rotating 3D model. The skinview3d
// library (three.js under the hood) is dynamically imported on mount only -
// it's a heavy, canvas/WebGL-dependent package that has no business running
// during server-side rendering.
//
// The skin texture is resolved via our own /api/skin route, which goes
// straight to Mojang rather than a third-party proxy (see that route for
// why). If resolution fails for any reason, we fall back to minotar.net
// so a card never ends up fully blank.
interface SkinViewer3DProps {
  username: string;
  width?: number;
  height?: number;
  className?: string;
}

async function resolveSkinUrl(username: string): Promise<string> {
  try {
    const res = await fetch(`/api/skin?username=${encodeURIComponent(username)}`);
    if (res.ok) {
      const data = (await res.json()) as { skinUrl?: string | null };
      if (data.skinUrl) return data.skinUrl;
    }
  } catch {
    // fall through to the fallback below
  }
  return `https://minotar.net/skin/${encodeURIComponent(username)}`;
}

export function SkinViewer3D({ username, width = 220, height = 280, className = "" }: SkinViewer3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<SkinViewer | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all([import("skinview3d"), resolveSkinUrl(username)]).then(([{ SkinViewer }, skinUrl]) => {
      if (cancelled || !canvasRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const viewer = new SkinViewer({
        canvas: canvasRef.current,
        width,
        height,
        skin: skinUrl,
        zoom: 0.72,
        fov: 32,
      });

      viewer.autoRotate = !prefersReducedMotion;
      viewer.autoRotateSpeed = 0.55;
      viewer.controls.enableZoom = false;
      viewer.controls.enablePan = false;
      viewer.globalLight.intensity = 3;
      viewer.cameraLight.intensity = 0.6;

      viewerRef.current = viewer;
      setLoaded(true);
    });

    return () => {
      cancelled = true;
      viewerRef.current?.dispose();
      viewerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-white/10 border-t-[#ff2e2e] rounded-full animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing touch-none"
        aria-label={`3D rotating skin preview for ${username}`}
      />
    </div>
  );
}
