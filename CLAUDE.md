# Black Skies

## Workflow Rules

- Gitflow: branch from `dev`, PRs target `dev`. `main` = releases only.
- `prisma/migrations/` — never edit existing; create new via `pnpm db-migrate-dev`.

## Sensitive Areas

- `src/app/api/auth/`, `src/lib/providers/AuthProvider.tsx` — no edits without explicit approval.

## Architecture Decisions

- Prisma 7 client generates to `dist/prisma`. Import from `dist/prisma`, never `@prisma/client`.
- Schema has no `url`. CLI reads from `prisma.config.ts`; runtime connects via driver adapter in `src/lib/prisma/prisma.ts`.
- `prisma.config.ts` loads `dotenv/config` explicitly — Prisma 7 CLI doesn't auto-load `.env`.
- `src/lib/prisma/prisma.ts` has `import 'server-only'` — build fails if Client Component imports it.
- Apollo at `localhost:4000/graphql` = separate game backend, not a Next.js API route.
- Apollo auth middleware reads `localStorage` — client-side only; no SSR usage.

## Runtime Gotchas

- `Banned.expiresAt null` = permanent ban. Always check `expiresAt` before expiry logic.
- Path aliases: `ui/*` → `src/app/_ui/*`, `@/*` → `src/*`, `@@/*` → project root.

## Conventions Not Enforced by Tooling

- UI follows atomic design: atoms → molecules → organisms, all under `src/app/_ui/`.
- Do not impose flat layout, don't lump multiple components into one file.
