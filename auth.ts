import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma/prisma';
import Discord from 'next-auth/providers/discord';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import 'next-auth/jwt';

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  adapter: PrismaAdapter(prisma),
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID!,
      clientSecret: process.env.AUTH_DISCORD_SECRET!,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '*********',
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;

        let banned;
        const xff = req.headers?.['x-forwarded-for'];
        const ip =
          typeof xff === 'string'
            ? xff.split(',')[0]
            : (req.headers?.['x-real-ip'] ?? 'unknown');

        switch (ip) {
          case 'unknown':
            return null;
          default:
            banned = await prisma.bannedIP.findFirst({
              where: {
                ip,
                OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
              },
            });
        }

        if (banned) return null;

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user || !user.hashedPwd) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPwd
        );
        if (!isValid) return null;

        return user;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },
  },
});
