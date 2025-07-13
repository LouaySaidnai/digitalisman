import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Récupérer toutes les données de contact
    const contactData = await prisma.contact.findMany();
    
    // Transformer les données en objet pour faciliter l'accès
    const contactMap = contactData.reduce((acc, item) => {
      acc[item.label] = item.value;
      return acc;
    }, {} as Record<string, string>);
    
    return NextResponse.json(contactMap);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de contact:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { label, value } = body;
    
    if (!label || !value) {
      return NextResponse.json(
        { error: 'Label et value sont requis' },
        { status: 400 }
      );
    }
    
    // Créer ou mettre à jour une donnée de contact
    const contact = await prisma.contact.upsert({
      where: { label },
      update: { value },
      create: { label, value }
    });
    
    return NextResponse.json(contact);
  } catch (error) {
    console.error('Erreur lors de la création/modification des données de contact:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde' },
      { status: 500 }
    );
  }
} 