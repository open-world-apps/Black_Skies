import { prisma } from '@/lib/prisma/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const saltRounds = process.env.AUTH_SALT_ROUNDS;

export const POST = async (req: Request) => {
  await req.formData().then(res => {
    bcrypt.hash(res.get('password')!.toString(), Number(saltRounds), async (err, hash) => {
      await prisma.user.create({
        data: {
          username: res.get('username')!.toString(),
          email: res.get('email')!.toString(),
          hashedPwd: hash,
        },
      });
    });
  });

  return NextResponse.json({ success: true });
};
