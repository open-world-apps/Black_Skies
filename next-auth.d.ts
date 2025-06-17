import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      emailVerified?: string;
      image?: string;
      accessToken?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    accessToken?: string;
  }
}
