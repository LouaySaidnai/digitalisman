{/*api d'authentification*/}
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";

const authCallbacks = {
  async signIn({
    user,
    account,
    profile,
  }: {
    user: any;
    account: any;
    profile: any;
  }) {
    if (account?.provider === "credentials") {
      return true;
    }

    // Pour les providers OAuth, créer ou mettre à jour l'utilisateur
    if (account?.provider && profile) {
      try {
        const existingUser = await (prisma as any).user.findUnique({
          where: { email: user.email }
        });

        if (!existingUser) {
          // Créer un nouvel utilisateur
          await (prisma as any).user.create({
            data: {
              email: user.email!,
              nom: user.name?.split(' ').slice(-1)[0] || '',
              prenom: user.name?.split(' ')[0] || '',
              password: '', // Pas de mot de passe pour les utilisateurs OAuth
              provider: account.provider,
              providerId: account.providerAccountId,
            }
          });
        }
        return true;
      } catch (error) {
        console.error("Erreur lors de la création/mise à jour de l'utilisateur:", error);
        return false;
      }
    }

    return true;
  },
  async jwt({ token, user, account }: { token: any; user?: any; account?: any }) {
    if (user) {
      token.id = user.id;
      token.email = user.email;
      token.nom = user.nom;
      token.prenom = (user as any).prenom;
    }
    return token;
  },
  async session({ session, token }: { session: any; token: any }) {
    if (token && session.user) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      (session.user as any).nom = token.nom as string;
      (session.user as any).prenom = token.prenom as string;
    }
    return session;
  }
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await (prisma as any).user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          nom: user.nom,
          prenom: user.prenom,
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    })
  ],
  callbacks: authCallbacks,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 heures par défaut
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 heures par défaut
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 // 24 heures par défaut
      }
    }
  },
  pages: {
    signIn: "/Login"
  }
});

export { handler as GET, handler as POST };