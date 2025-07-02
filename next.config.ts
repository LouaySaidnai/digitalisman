import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  images: {
    domains: ['media.istockphoto.com'],  // ajoute ce domaine ici
  },
};

module.exports = nextConfig;
export default nextConfig;
