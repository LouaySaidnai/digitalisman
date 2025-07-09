import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Pour des raisons de sécurité, on ne révèle pas si l'email existe ou non
      return NextResponse.json(
        { message: "Si cet email existe dans notre base de données, vous recevrez un lien de récupération." },
        { status: 200 }
      );
    }

    // Générer un token de récupération
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 heure

    // Sauvegarder le token en base de données
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });

    const resetLink = `http://localhost:3000/recuperation-mdp?token=${resetToken}`;
    await sendResetEmail(email, resetLink);

    return NextResponse.json(
      { message: "Si cet email existe dans notre base de données, vous recevrez un lien de récupération." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération de mot de passe:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function sendResetEmail(to: string, resetLink: string) {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM!, // Doit être validé dans SendGrid
    subject: "Réinitialisation de votre mot de passe",
    html: `
      <p>Bonjour,</p>
      <p>Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous :</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Ce lien expirera dans 1 heure.</p>
    `,
  };

  await sgMail.send(msg);
}   