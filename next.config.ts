import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Admit One event artwork on the events page
    remotePatterns: [{ protocol: "https", hostname: "media.admitone.com" }],
  },
};

export default nextConfig;
