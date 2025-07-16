import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
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

    const body = await request.json();
    const { statut, statutAcces, notes } = body;

    // Vérifier que la facture existe
    const existingFacture = await prisma.facture.findUnique({
      where: { id: factureId },
    });

    if (!existingFacture) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Seuls certains champs peuvent être modifiés pour des raisons légales
    const allowedUpdates: any = {};

    // Statut : seulement pour les factures en attente
    if (statut && existingFacture.statut === 'en_attente') {
      if (['annulee', 'payee'].includes(statut)) {
        allowedUpdates.statut = statut;
      }
    }

    // Statut d'accès : peut toujours être modifié
    if (statutAcces && ['en_attente', 'active', 'expiree'].includes(statutAcces)) {
      allowedUpdates.statutAcces = statutAcces;
    }

    // Notes : peut toujours être modifié
    if (notes !== undefined) {
      allowedUpdates.notes = notes;
    }

    // Si aucun champ autorisé n'a été fourni
    if (Object.keys(allowedUpdates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // Ajouter un timestamp dans les notes pour tracer les modifications
    if (allowedUpdates.notes) {
      const timestamp = `[${new Date().toISOString()}] Modification par admin`;
      allowedUpdates.notes = existingFacture.notes 
        ? `${existingFacture.notes}\n\n${timestamp}`
        : timestamp;
    }

    // Mettre à jour la facture
    const updatedFacture = await prisma.facture.update({
      where: { id: factureId },
      data: allowedUpdates,
    });

    return NextResponse.json({
      message: 'Invoice updated successfully',
      facture: updatedFacture,
    });
  } catch (error) {
    console.error('Error updating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to update invoice' },
      { status: 500 }
    );
  }
} 