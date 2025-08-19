/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Banned } from './dist/prisma';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email: string;
      emailVerified?: string;
      image?: string;
      accessToken?: string;
    } & DefaultSession['user'];
  }

  interface User {
    banned?: {
      id: number;
      ip: string | null;
      reason: string | null;
      bannedAt: Date;
      expiresAt: Date | null;
    } | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    accessToken?: string;
  }
}
