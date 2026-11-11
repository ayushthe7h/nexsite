"use client";

import React, { useEffect, useRef, useState } from "react";
import type { SkinViewer } from "skinview3d";

// Renders a Minecraft username's skin as a rotating 3D model. The skinview3d
// library (three.js under the hood) is dynamically imported on mount only -
// it's a heavy, canvas/WebGL-dependent package that has no business running
// during server-side rendering.
//
// The skin texture itself is fetched by username via minotar.net, which
// resolves the username to its current Mojang skin server-side and serves
// it with permissive CORS headers (required for WebGL to use it as a
// texture without tainting the canvas).
interface SkinViewer3DProps {
  username: string;
  width?: number;
  height?: number;
  className?: string;
}

export function SkinViewer3D({ username, width = 220, height = 280, className = "" }: SkinViewer3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<SkinViewer | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    import("skinview3d").then(({ SkinViewer }) => {
      if (cancelled || !canvasRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const viewer = new SkinViewer({
        canvas: canvasRef.current,
        width,
        height,
        skin: `https://minotar.net/skin/${encodeURIComponent(username)}`,
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
