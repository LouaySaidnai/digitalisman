import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, email, telephone, sujet, message } = body;

    // Validation des champs requis
    if (!nom || !email || !sujet || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Enregistrement du message dans la base
    const nouveauMessage = await prisma.message.create({
      data: {
        nom,
        email,
        telephone,
        objet: sujet,
        message,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Votre message a été enregistré avec succès',
      data: nouveauMessage,
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement du message' },
      { status: 500 }
    );
  }
} 