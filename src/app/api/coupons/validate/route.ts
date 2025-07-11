import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(request: NextRequest) {
  try {
    const { code, montantCommande } = await request.json()
    
    if (!code || !montantCommande) {
      return NextResponse.json(
        { error: 'Code et montant de commande requis' },
        { status: 400 }
      )
    }

    // Récupérer la session utilisateur
    const session = await getServerSession(authOptions)
    const userId = session?.user?.email // Correction : utiliser email comme identifiant unique

    // Rechercher le coupon
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        utilisationsCoupon: {
          where: userId ? { userId } : undefined
        }
      }
    })

    if (!coupon) {
      return NextResponse.json(
        { error: 'Code de réduction invalide' },
        { status: 404 }
      )
    }

    // Vérifier si le coupon est actif
    if (!coupon.actif) {
      return NextResponse.json(
        { error: 'Ce code de réduction n\'est plus valide' },
        { status: 400 }
      )
    }

    // Vérifier les dates de validité
    const maintenant = new Date()
    if (coupon.dateDebut && maintenant < coupon.dateDebut) {
      return NextResponse.json(
        { error: 'Ce code de réduction n\'est pas encore valide' },
        { status: 400 }
      )
    }

    if (coupon.dateFin && maintenant > coupon.dateFin) {
      return NextResponse.json(
        { error: 'Ce code de réduction a expiré' },
        { status: 400 }
      )
    }

    // Vérifier le montant minimum
    if (coupon.montantMinimum && montantCommande < coupon.montantMinimum) {
      return NextResponse.json(
        { error: `Montant minimum requis : ${coupon.montantMinimum}€` },
        { status: 400 }
      )
    }

    // Vérifier les limites d'utilisation globales
    if (coupon.nombreUtilisationsMax && coupon.nombreUtilisationsActuelles >= coupon.nombreUtilisationsMax) {
      return NextResponse.json(
        { error: 'Ce code de réduction a atteint sa limite d\'utilisation' },
        { status: 400 }
      )
    }

    // Vérifier les limites par utilisateur
    if (userId && coupon.utilisationsCoupon.length >= coupon.nombreUtilisationsParUtilisateur) {
      return NextResponse.json(
        { error: 'Vous avez déjà utilisé ce code de réduction' },
        { status: 400 }
      )
    }



    // Calculer la réduction
    let montantReduction = 0
    if (coupon.typeReduction === 'pourcentage') {
      montantReduction = montantCommande * (coupon.valeurReduction / 100)
    } else if (coupon.typeReduction === 'montant_fixe') {
      montantReduction = coupon.valeurReduction
    }

    // Appliquer le montant maximum de réduction
    if (coupon.montantMaximum && montantReduction > coupon.montantMaximum) {
      montantReduction = coupon.montantMaximum
    }

    return NextResponse.json({
      success: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        description: coupon.description,
        typeReduction: coupon.typeReduction,
        valeurReduction: coupon.valeurReduction,
        montantReduction: Math.round(montantReduction * 100) / 100, // Arrondir à 2 décimales
        montantMaximum: coupon.montantMaximum
      }
    })

  } catch (error) {
    console.error('Erreur validation coupon:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la validation du code de réduction' },
      { status: 500 }
    )
  }
} 