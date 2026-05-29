import 'dotenv/config'; // Prisma CLI runs outside Next, so .env must be loaded explicitly (Prisma 7 no longer auto-loads it)

import { defineConfig, env } from 'prisma/config';

// This config is consumed by the Prisma CLI only (migrate, db push/pull, generate).
// The runtime PrismaClient gets its connection from the driver adapter — see src/lib/prisma/prisma.ts.
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
