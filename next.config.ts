import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Admit One event artwork and ESPN team logos
    remotePatterns: [
      { protocol: "https", hostname: "media.admitone.com" },
      { protocol: "https", hostname: "a.espncdn.com" }, // team logos
    ],
  },
};

export default nextConfig;
