import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signIn } from "next-auth/react";

export async function POST(request: NextRequest) {
  try {
    const { credential, userData } = await request.json();

    if (!credential || !userData) {
      return NextResponse.json(
        { error: "Données Google manquantes" },
        { status: 400 }
      );
    }

    // Extraire les informations de l'utilisateur depuis le JWT Google
    const email = userData.email;
    const name = userData.name;
    const givenName = userData.given_name || name?.split(' ')[0] || '';
    const familyName = userData.family_name || name?.split(' ').slice(-1)[0] || '';
    const googleId = userData.sub; // ID unique Google

    if (!email) {
      return NextResponse.json(
        { error: "Email Google manquant" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await (prisma as any).user.findUnique({
      where: { email }
    });

    if (existingUser) {
      // L'utilisateur existe déjà, on peut le connecter
      console.log('Utilisateur existant connecté:', email);
      return NextResponse.json(
        { message: "Connexion réussie", user: existingUser },
        { status: 200 }
      );
    }

    // Créer un nouvel utilisateur
    const newUser = await (prisma as any).user.create({
      data: {
        email,
        nom: familyName,
        prenom: givenName,
        password: '', // Pas de mot de passe pour les utilisateurs Google
        provider: 'google',
        providerId: googleId,
      }
    });

    console.log('Nouvel utilisateur Google créé:', email);

    return NextResponse.json(
      { message: "Utilisateur créé avec succès", user: newUser },
      { status: 201 }
    );

  } catch (error) {
    console.error("Erreur lors de la connexion Google:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
} 