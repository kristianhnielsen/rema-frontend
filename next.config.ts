import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*rema1000.dk",
      },
    ],
  },
};

export default nextConfig;
