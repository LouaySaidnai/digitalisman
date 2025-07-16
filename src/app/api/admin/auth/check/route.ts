import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Récupérer l'email depuis les cookies de session
    const email = request.cookies.get('admin_email')?.value;
    
    if (!email) {
      return NextResponse.json({ isAdmin: false });
    }

    // Vérifier si l'utilisateur existe et est admin
    const user = await prisma.user.findUnique({
      where: { email },
      select: { role: true }
    });

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ isAdmin: false });
    }

    return NextResponse.json({ isAdmin: true });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return NextResponse.json({ isAdmin: false });
  }
} 