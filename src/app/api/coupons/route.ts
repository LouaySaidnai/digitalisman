import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Créer un nouveau coupon
export async function POST(request: NextRequest) {
  try {
    const { 
      code, 
      description, 
      typeReduction, 
      valeurReduction, 
      montantMinimum, 
      montantMaximum,
      nombreUtilisationsMax,
      nombreUtilisationsParUtilisateur,
      dateDebut,
      dateFin
    } = await request.json()

    // Validation
    if (!code || !typeReduction || !valeurReduction) {
      return NextResponse.json(
        { error: 'Code, type de réduction et valeur sont requis' },
        { status: 400 }
      )
    }

    // Créer le coupon
    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        description,
        typeReduction,
        valeurReduction: parseFloat(valeurReduction),
        montantMinimum: montantMinimum ? parseFloat(montantMinimum) : null,
        montantMaximum: montantMaximum ? parseFloat(montantMaximum) : null,
        nombreUtilisationsMax: nombreUtilisationsMax ? parseInt(nombreUtilisationsMax) : null,
        nombreUtilisationsParUtilisateur: nombreUtilisationsParUtilisateur ? parseInt(nombreUtilisationsParUtilisateur) : 1,
        dateDebut: dateDebut ? new Date(dateDebut) : null,
        dateFin: dateFin ? new Date(dateFin) : null,
        actif: true
      }
    })



    return NextResponse.json({
      success: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        description: coupon.description,
        typeReduction: coupon.typeReduction,
        valeurReduction: coupon.valeurReduction
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Erreur création coupon:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du coupon' },
      { status: 500 }
    )
  }
}

// Lister tous les coupons
export async function GET(request: NextRequest) {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ coupons })

  } catch (error) {
    console.error('Erreur récupération coupons:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des coupons' },
      { status: 500 }
    )
  }
} 