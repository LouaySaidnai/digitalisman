/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Supprimer serverComponentsExternalPackages
    // serverComponentsExternalPackages: ['@prisma/client']
  },
  serverExternalPackages: ['@prisma/client'], // ← Nouvelle syntaxe
  eslint: {
    // Désactiver ESLint pendant le build
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
