import type { NextConfig } from "next";
const nextConfig = {
  eslint :{
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['media.istockphoto.com'],  // ajoute ce domaine ici
  },
  experimental: {
  serverComponentsExternalPackages: ['@prisma/client']
}
}
export default nextConfig;
module.exports = nextConfig;