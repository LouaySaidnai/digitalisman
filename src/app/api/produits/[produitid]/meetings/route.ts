import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { MeetingData } from '../../../../../types/meeting';

export async function GET(
  request: NextRequest,
  { params }: { params: { produitid: string } }
) {
  try {
    const produitId = parseInt(params.produitid);
    
    if (isNaN(produitId)) {
      return NextResponse.json(
        { error: 'ID de produit invalide' },
        { status: 400 }
      );
    }

    const produit = await prisma.produit.findUnique({
      where: { id: produitId },
      select: { meeting: true }
    });

    if (!produit) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      );
    }

    // Retourner les données de meeting ou un objet vide
    const meetingData = produit.meeting as MeetingData | null;
    
    return NextResponse.json({
      success: true,
      data: meetingData || {}
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des meetings:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 