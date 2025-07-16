import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const factures = await prisma.facture.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            nom: true,
            prenom: true,
          },
        },
        utilisationsCoupon: {
          include: {
            coupon: {
              select: {
                code: true,
                description: true,
              },
            },
          },
        },
      },
      orderBy: {
        dateFacture: 'desc',
      },
    });

    // Transformer les données pour l'interface admin
    const formattedOrders = factures.map(facture => {
      // Parser les produits JSON
      let produits = [];
      try {
        if (typeof facture.produits === 'string') {
          produits = JSON.parse(facture.produits);
        } else if (facture.produits && typeof facture.produits === 'object') {
          produits = facture.produits;
        }
      } catch (error) {
        console.error('Error parsing produits JSON:', error);
        produits = [];
      }

      // Calculer le nombre de produits
      const nombreProduits = produits.reduce((total: number, produit: any) => {
        return total + (produit.quantiteProduit || 1);
      }, 0);

      // Obtenir les informations du coupon utilisé
      const couponUtilise = facture.utilisationsCoupon[0]?.coupon;

      return {
        id: facture.id,
        numeroFacture: facture.numeroFacture,
        dateFacture: facture.dateFacture,
        datePaiement: facture.datePaiement,
        
        // Informations client
        clientId: facture.userId,
        clientEmail: facture.clientEmail || facture.user?.email || 'N/A',
        clientNom: facture.clientNom || facture.user?.nom || 'N/A',
        clientPrenom: facture.clientPrenom || facture.user?.prenom || 'N/A',
        clientName: `${facture.clientPrenom || facture.user?.prenom || ''} ${facture.clientNom || facture.user?.nom || ''}`.trim() || 'Client inconnu',
        
        // Produits
        produits: produits,
        nombreProduits: nombreProduits,
        
        // Montants
        sousTotal: facture.sousTotal,
        reduction: facture.reduction,
        total: facture.total,
        
        // Statuts
        statut: facture.statut,
        statutAcces: facture.statutAcces,
        
        // Paiement
        methodePaiement: facture.methodePaiement,
        referencePaiement: facture.referencePaiement,
        
        // Coupon
        couponUtilise: couponUtilise ? {
          code: couponUtilise.code,
          description: couponUtilise.description,
        } : null,
        
        // Accès
        dateAcces: facture.dateAcces,
        
        // Métadonnées
        notes: facture.notes,
        createdAt: facture.createdAt,
        updatedAt: facture.updatedAt,
      };
    });

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
} 