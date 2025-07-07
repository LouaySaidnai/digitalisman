import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const produits = await prisma.produit.findMany({
      where: {
        statut: 'actif'
      },
      select: {
        id: true,
        nom: true,
        slug: true,
        sousTitre: true,
        livrablesDetailles: true,
        prix: true,
        niveauPriorite: true,
        cible: true,
        contenu: true,
        duree: true,
        supportsInclus: true,
        temoignages: true,
        argumentsCommerciaux: true,
        scriptType: true,
        format: true,
        conditionsPaiement: true,
        garantie: true
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