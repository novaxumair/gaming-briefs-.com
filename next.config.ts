import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.cloudflare.steamstatic.com" },
      { protocol: "https", hostname: "shared.akamai.steamstatic.com" },
      { protocol: "https", hostname: "assets-prd.ignimgs.com" },
      { protocol: "https", hostname: "assets1.ignimgs.com" },
      { protocol: "https", hostname: "assets.ignimgs.com" },
      { protocol: "https", hostname: "images.igdb.com" },
      { protocol: "https", hostname: "zadeyo.com" },
      { protocol: "https", hostname: "wh-satano.ru" },
      { protocol: "https", hostname: "cdn.wh-satano.ru" },
    ],
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ["three", "framer-motion"],
  },
  async redirects() {
    return [
      { source: "/articles", destination: "/blogs", permanent: true },
      { source: "/game-cheats", destination: "/blogs", permanent: true },
      {
        source: "/game-cheats/:slug",
        destination: "/:slug-cheats",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
