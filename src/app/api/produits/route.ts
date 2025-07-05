import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const produits = await prisma.produit.findMany({
      where: {
        statut: 'actif'
      },
      select: {
        id: true,
        nom: true,
        slug: true,
        description: true,
        livrable: true,
        prix: true
      }
    })

    return NextResponse.json(produits)
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 