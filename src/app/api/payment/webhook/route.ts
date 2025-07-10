import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = headers().get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Signature Stripe manquante' },
        { status: 400 }
      )
    }

    let event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      console.error('Erreur signature webhook:', err)
      return NextResponse.json(
        { error: 'Signature invalide' },
        { status: 400 }
      )
    }

    // Traiter les événements
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object)
        break
      
      case 'checkout.session.expired':
        await handleCheckoutSessionExpired(event.data.object)
        break
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object)
        break
      
      default:
        console.log(`Événement non géré: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Erreur webhook:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

async function handleCheckoutSessionCompleted(session: any) {
  try {
    const { factureId, userId, couponCode } = session.metadata

    // Mettre à jour la facture
    await prisma.facture.update({
      where: { id: parseInt(factureId) },
      data: {
        statut: 'payee',
        datePaiement: new Date(),
        referencePaiement: session.payment_intent,
        statutAcces: 'active',
        dateAcces: new Date()
      }
    })

    // Journaliser l'utilisation du coupon si présent
    if (couponCode && session.amount_total < session.amount_subtotal) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode }
      })

      if (coupon) {
        const montantReduction = (session.amount_subtotal - session.amount_total) / 100

        await prisma.utilisationCoupon.create({
          data: {
            couponId: coupon.id,
            userId: userId,
            factureId: parseInt(factureId),
            montantReduction: montantReduction,
            montantCommande: session.amount_subtotal / 100
          }
        })

        // Incrémenter le compteur d'utilisations
        await prisma.coupon.update({
          where: { id: coupon.id },
          data: { nombreUtilisationsActuelles: { increment: 1 } }
        })
      }
    }

    console.log(`✅ Paiement réussi pour la facture ${factureId}`)

  } catch (error) {
    console.error('Erreur traitement paiement réussi:', error)
  }
}

async function handleCheckoutSessionExpired(session: any) {
  try {
    const { factureId } = session.metadata

    await prisma.facture.update({
      where: { id: parseInt(factureId) },
      data: {
        statut: 'annulee'
      }
    })

    console.log(`❌ Session expirée pour la facture ${factureId}`)

  } catch (error) {
    console.error('Erreur traitement session expirée:', error)
  }
}

async function handlePaymentFailed(paymentIntent: any) {
  try {
    // Trouver la facture par la référence de paiement
    const facture = await prisma.facture.findFirst({
      where: { referencePaiement: paymentIntent.id }
    })

    if (facture) {
      await prisma.facture.update({
        where: { id: facture.id },
        data: {
          statut: 'annulee'
        }
      })

      console.log(`❌ Paiement échoué pour la facture ${facture.id}`)
    }

  } catch (error) {
    console.error('Erreur traitement paiement échoué:', error)
  }
} 