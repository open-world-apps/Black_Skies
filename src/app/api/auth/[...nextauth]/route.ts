import 'dotenv/config';

import NextAuth, { AuthOptions, SessionStrategy } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Discord from 'next-auth/providers/discord';
import Google from 'next-auth/providers/google';
import Auth0Provider from 'next-auth/providers/auth0';
import { prisma } from '@/lib/prisma/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { isBanned } from '@/lib/auth';
import bcrypt from 'bcrypt';

const eStrategy = process.env.NEXTAUTH_STRATEGY!;
const isValidStrategy = (val: unknown): val is SessionStrategy =>
  val === 'jwt' || val === 'database';
const strategy: SessionStrategy | undefined = isValidStrategy(eStrategy)
  ? eStrategy
  : undefined;

export const authOptions: AuthOptions = {
  debug: false,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;

        const banned = isBanned(req);
        const user = await prisma.user.findUnique({
          where: { name: credentials.username },
        });

        if (banned) return null;

        if (!user || !user.hashedPwd) return null;

        const isValid = bcrypt.compare(credentials.password, user.hashedPwd);

        if (!isValid) return null;

        return user;
      },
    }),
    Discord({
      clientId: process.env.AUTH_DISCORD_ID!,
      clientSecret: process.env.AUTH_DISCORD_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_ID!,
      clientSecret: process.env.AUTH0_SECRET!,
      issuer: process.env.AUTH0_ISSUER
    })
  ],
  session: { strategy: strategy },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, user, token }) {
      if (session.user) {
        session.user.name = token ? token.name : user.name;
        session.user.id = token ? token.id : user.id;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
