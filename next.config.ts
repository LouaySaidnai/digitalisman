/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Supprimer serverComponentsExternalPackages
    // serverComponentsExternalPackages: ['@prisma/client']
  },
  serverExternalPackages: ['@prisma/client'] // ← Nouvelle syntaxe
}

module.exports = nextConfig
