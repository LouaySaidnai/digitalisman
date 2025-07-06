import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Tentative de connexion à la base de données...')
    console.log('📊 DATABASE_URL:', process.env.DATABASE_URL ? 'Configurée' : 'Non configurée')
    
    const produits = await prisma.produit.findMany({
      where: {
        statut: 'actif'
      },
      select: {
        id: true,
        nom: true,
        slug: true,
        sousTitre: true,
        prix: true,
        contenu: true,
        livrablesDetailles: true
      }
    })

    console.log(`✅ ${produits.length} produits récupérés avec succès`)
    return NextResponse.json(produits)
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des produits:', error)
    console.error('🔍 Détails de l\'erreur:', {
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json(
      { 
        error: 'Erreur interne du serveur',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
} 