import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      );
    }

    // Récupérer l'utilisateur depuis la base
    const user = await (prisma as any).user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Créer une session pour l'utilisateur
    const session = {
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        provider: user.provider
      }
    };

    return NextResponse.json(
      { 
        message: "Session créée avec succès", 
        user: session.user,
        isAuthenticated: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur lors de la création de session:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
} 