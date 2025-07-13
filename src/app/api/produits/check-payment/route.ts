import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { isAccessExpired } from '@/lib/dureeUtils';

export async function POST(request: NextRequest) {
  try {
    const { produitSlug } = await request.json();
    
    // Récupérer la session utilisateur
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Utilisateur non connecté' },
        { status: 401 }
      );
    }

    // Récupérer l'utilisateur depuis la base de données
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Récupérer le produit par son slug
    const produit = await prisma.produit.findUnique({
      where: { slug: produitSlug }
    });

    if (!produit) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier si l'utilisateur a payé pour ce produit ET si l'accès est actif
    const factures = await prisma.facture.findMany({
      where: {
        userId: user.id,
        statut: 'payee', // Seulement les factures payées
        statutAcces: 'active', // Seulement les accès actifs
        produits: {
          path: '$[*].nomProduit',
          array_contains: [produit.nom]
        }
      },
      select: {
        id: true,
        dateAcces: true,
        statutAcces: true
      }
    });

    // Vérifier si l'accès a expiré pour chaque facture
    let hasValidAccess = false;
    
    for (const facture of factures) {
      // Vérifier si l'accès a expiré selon la durée du produit
      const isExpired = isAccessExpired(facture.dateAcces, produit.duree);
      
      if (!isExpired) {
        hasValidAccess = true;
        break;
      }
    }

    // Si l'accès a expiré, mettre à jour le statut
    if (factures.length > 0 && !hasValidAccess) {
      await prisma.facture.updateMany({
        where: {
          id: { in: factures.map(f => f.id) }
        },
        data: {
          statutAcces: 'expiree'
        }
      });
    }

    return NextResponse.json({
      hasPaid: hasValidAccess,
      produit: {
        id: produit.id,
        nom: produit.nom,
        slug: produit.slug,
        duree: produit.duree,
        meeting: produit.meeting
      }
    });

  } catch (error) {
    console.error('Erreur lors de la vérification du paiement:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 