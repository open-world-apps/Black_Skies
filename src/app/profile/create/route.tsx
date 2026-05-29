import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma/prisma';

const saltRounds = process.env.AUTH_SALT_ROUNDS;

export const POST = async (req: Request) => {
  try {
    const data = await req.formData();
    const hash = await bcrypt.hash(
      data.get('password')!.toString(),
      Number(saltRounds)
    );
    const user = await prisma.user.create({
      data: {
        name: data.get('username')!.toString(),
        email: data.get('email')!.toString(),
        hashedPwd: hash,
      },
    });

    return NextResponse.json({ userId: user.id, success: true });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to create user:\n\n${err}` },
      { status: 500 }
    );
  }
};
