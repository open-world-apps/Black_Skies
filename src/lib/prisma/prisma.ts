import 'server-only'; // build fails loud if a Client Component ever imports this

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../../../dist/prisma';

// Prisma 7: schema datasource has no `url`; the runtime client connects via a driver adapter.
// DATABASE_URL is loaded into process.env automatically by Next for server-side code.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
