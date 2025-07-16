import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transformer les données pour l'interface admin
    const formattedMessages = messages.map(message => ({
      id: message.id,
      nom: message.nom,
      email: message.email,
      telephone: message.telephone || 'Non renseigné',
      objet: message.objet,
      message: message.message,
      createdAt: message.createdAt,
      // Calculer l'âge du message
      age: getMessageAge(message.createdAt),
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// Fonction pour calculer l'âge du message
function getMessageAge(createdAt: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - createdAt.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays} jour(s)`;
  } else if (diffInHours > 0) {
    return `${diffInHours} heure(s)`;
  } else {
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return `${diffInMinutes} minute(s)`;
  }
} 