import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '../../../../lib/stripe'
import { prisma } from '../../../../lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(request: NextRequest) {
  try {
    const { cartItems, couponCode, montantReduction } = await request.json()
    
    // Récupérer la session utilisateur
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Utilisateur non connecté' },
        { status: 401 }
      )
    }

    // Calculer le total
    const sousTotal = cartItems.reduce((total: number, item: any) => {
      const prix = parseFloat(item.prix.replace('€', ''))
      return total + (prix * item.quantite)
    }, 0)
    
    const total = sousTotal - (montantReduction || 0)

    // Récupérer l'utilisateur complet depuis la base de données
    const user = await prisma.user.findUnique({
      where: { email: session.user.email || '' }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Créer la facture en statut "en_attente"
    const facture = await prisma.facture.create({
      data: {
        userId: user.id, // Utiliser l'ID de l'utilisateur, pas l'email
        numeroFacture: `FAC-${new Date().getFullYear()}-${String(await prisma.facture.count() + 1).padStart(3, '0')}`,
        produits: cartItems,
        sousTotal,
        reduction: montantReduction || 0,
        total,
        clientEmail: session.user.email || '',
        clientNom: session.user.name || '',
        clientPrenom: '',
        statut: 'en_attente'
      }
    })

    // Créer les line items pour Stripe
    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.nom,
          description: item.description || '',
        },
        unit_amount: Math.round(parseFloat(item.prix.replace('€', '')) * 100), // Stripe utilise les centimes
      },
      quantity: item.quantite,
    }))

    // Ajouter la réduction si applicable
    if (montantReduction && montantReduction > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Réduction - ${couponCode}`,
          },
          unit_amount: -Math.round(montantReduction * 100), // Montant négatif pour la réduction
        },
        quantity: 1,
      })
    }

    // Déterminer l'URL de base
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (process.env.NODE_ENV === 'production' 
                     ? 'https://my-app-lake-eight-18.vercel.app' 
                     : 'http://localhost:3000')

    // Créer la session Stripe
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        factureId: facture.id.toString(),
        userId: session.user.email || '',
        couponCode: couponCode || '',
      },
      customer_email: session.user.email || undefined,
    })

    return NextResponse.json({
      sessionId: stripeSession.id,
      url: stripeSession.url,
      factureId: facture.id
    })

  } catch (error) {
    console.error('Erreur création session Stripe:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    )
  }
} 