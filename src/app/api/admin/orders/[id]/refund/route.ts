import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const factureId = parseInt(params.id);
    
    if (isNaN(factureId)) {
      return NextResponse.json(
        { error: 'Invalid invoice ID' },
        { status: 400 }
      );
    }

    // Récupérer la facture
    const facture = await prisma.facture.findUnique({
      where: { id: factureId },
      include: {
        user: true,
      },
    });

    if (!facture) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Vérifier que la facture peut être remboursée
    if (facture.statut !== 'payee') {
      return NextResponse.json(
        { error: 'Only paid invoices can be refunded' },
        { status: 400 }
      );
    }

    // Ici, vous devriez intégrer avec votre système de paiement
    // (Stripe, PayPal, etc.) pour effectuer le remboursement réel
    // Pour cet exemple, on simule le remboursement

    // Mettre à jour le statut de la facture
    const updatedFacture = await prisma.facture.update({
      where: { id: factureId },
      data: {
        statut: 'remboursee',
        statutAcces: 'expiree', // Révoquer l'accès
        datePaiement: null, // Effacer la date de paiement
        notes: facture.notes 
          ? `${facture.notes}\n\n[${new Date().toISOString()}] Remboursement effectué par l'admin`
          : `[${new Date().toISOString()}] Remboursement effectué par l'admin`,
      },
    });

    // TODO: Intégrer avec le système de paiement pour le remboursement réel
    // Exemple avec Stripe :
    // await stripe.refunds.create({
    //   payment_intent: facture.referencePaiement,
    //   amount: Math.round(facture.total * 100), // Stripe utilise les centimes
    // });

    return NextResponse.json({
      message: 'Refund processed successfully',
      facture: updatedFacture,
    });
  } catch (error) {
    console.error('Error processing refund:', error);
    return NextResponse.json(
      { error: 'Failed to process refund' },
      { status: 500 }
    );
  }
} 