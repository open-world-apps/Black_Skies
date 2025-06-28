import { prisma } from '@/lib/prisma/prisma';
import { RequestInternal } from 'next-auth';
import bcrypt from 'bcrypt';

export const isBanned = (
  req: Pick<RequestInternal, 'query' | 'headers' | 'body' | 'method'>
): boolean => {
  const bannedIP = async () => {
    return await prisma.bannedIP.findFirst({
      where: {
        ip,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
    });
  };

  let banned;
  const xff = req.headers?.['x-forwarded-for'];
  const ip =
    typeof xff === 'string'
      ? xff.split(',')[0]
      : (req.headers?.['x-real-ip'] ?? 'unknown');

  switch (ip) {
    case 'unknown':
      return true;
    default:
      banned = bannedIP();
  }

  if (banned === undefined) return true;

  return false;
};

export const authenticatePwd = (txtPwd: string, hashedPwd: string) => {
  return bcrypt.compare(txtPwd, hashedPwd);
}
