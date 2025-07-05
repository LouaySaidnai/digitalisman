import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ produitid: string }> }
) {
  try {
    const { produitid } = await params
    const produit = await prisma.produit.findUnique({
      where: {
        slug: produitid
      }
    })

    if (!produit) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json(produit)
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 