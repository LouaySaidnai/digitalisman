// src/app/api/save/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const saved = await prisma.testResult.create({
      data: {
        userId: body.userId,
        answers: body.answers,
        personality: body.personality,
      },
    });

    return NextResponse.json(saved);
  } catch (error) {
    console.error('Erreur API save:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}