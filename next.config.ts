import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/index.html",
        destination: "/",
      },
      {
        source: "/privacy.html",
        destination: "/privacy",
      },
      {
        source: "/terms.html",
        destination: "/terms",
      },
      {
        source: "/game-modes",
        destination: "/modes",
      },
      {
        source: "/join",
        destination: "/how-to-join",
      },
      {
        source: "/status",
        destination: "/uptime",
      },
      {
        source: "/control-panel",
        destination: "/panel",
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
