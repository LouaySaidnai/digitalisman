{/*api d'authentification*/}
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { SessionStrategy } from "next-auth";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null;
        }

        const user = await (prisma as any).user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        // Si c'est un utilisateur Google (avec provider), accepter sans vérifier le mot de passe
        if (user.provider === 'google' && credentials.password === 'google_user') {
          return {
            id: user.id,
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
          };
        }

        // Pour les utilisateurs normaux, vérifier le mot de passe
        if (!credentials.password) {
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
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }: any) => {
      return true;
    },
    jwt: async ({ token, user, account, profile, isNewUser }: any) => {
      return token;
    },
    session: async ({ session, token, user }: any) => {
      return session;
    }
  },
  session: {
    strategy: "jwt" as SessionStrategy,
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
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 // 24 heures par défaut
      }
    }
  },
  pages: {
    signIn: "/Login"
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };