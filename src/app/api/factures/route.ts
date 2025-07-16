import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Créer une nouvelle facture
export async function POST(request: NextRequest) {
  try {
    const { userId, produits, sousTotal, reduction, total, clientEmail, clientNom, clientPrenom, couponCode, montantReductionCoupon } = await request.json();

    // Validation
    if (!userId || !produits || !Array.isArray(produits) || produits.length === 0) {
      return NextResponse.json(
        { error: "Données de facturation invalides" },
        { status: 400 }
      );
    }

    // Générer un numéro de facture unique
    const date = new Date();
    const year = date.getFullYear();
    const count = await prisma.facture.count({
      where: {
        dateFacture: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1)
        }
      }
    });
    
    const numeroFacture = `FAC-${year}-${String(count + 1).padStart(3, '0')}`;

    // Créer la facture
    const facture = await prisma.facture.create({
      data: {
        userId,
        numeroFacture,
        produits,
        sousTotal,
        reduction,
        total,
        clientEmail,
        clientNom,
        clientPrenom,
        statut: "en_attente",
        datePaiement: new Date(),
        dateAcces: new Date() // Accès immédiat après paiement
      }
    });

    // Journaliser l'utilisation du coupon si présent
    if (couponCode && reduction > 0) {
      // Chercher le coupon
      const coupon = await prisma.coupon.findUnique({ where: { code: couponCode } });
      if (coupon) {
        await prisma.utilisationCoupon.create({
          data: {
            couponId: coupon.id,
            userId: userId,
            factureId: facture.id,
            montantReduction: reduction,
            montantCommande: sousTotal
          }
        });
        // Incrémenter le nombre d'utilisations actuelles du coupon
        await prisma.coupon.update({
          where: { id: coupon.id },
          data: { nombreUtilisationsActuelles: { increment: 1 } }
        });
      }
    }

    return NextResponse.json(
      { 
        message: "Facture créée avec succès", 
        facture: {
          id: facture.id,
          numeroFacture: facture.numeroFacture,
          total: facture.total,
          statut: facture.statut
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de la facture:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// Récupérer les factures d'un utilisateur
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: "ID utilisateur requis" },
        { status: 400 }
      );
    }

    const factures = await prisma.facture.findMany({
      where: { userId },
      orderBy: { dateFacture: 'desc' },
      select: {
        id: true,
        numeroFacture: true,
        dateFacture: true,
        statut: true,
        total: true,
        produits: true,
        methodePaiement: true
      }
    });

    return NextResponse.json({ factures });
  } catch (error) {
    console.error("Erreur lors de la récupération des factures:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
} 