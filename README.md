# Black Skies

A full-stack Next.js web application for a space combat game, featuring character creation, authentication, profile management, and integration with an Apollo GraphQL game backend.

## 🚀 Tech Stack

### Frontend

- **Next.js 16.2** (App Router) — React framework with SSR/SSG
- **React 19.2** — UI library
- **TypeScript** — Type safety
- **styled-components 6.4** — CSS-in-JS with full SSR support
- **Redux Toolkit 2.12** — Global state management
- **React Hook Form 7.76** — Form state management
- **Yup 1.7** — Schema validation

### Backend & Data

- **Prisma 7.8** — Type-safe ORM with PostgreSQL adapter
- **NextAuth 4.24** — Authentication with session management
- **PostgreSQL** — Primary database
- **Apollo Client 4.2** — GraphQL client for game backend integration

### UI Components

- **Radix UI** — Accessible component primitives (Avatar, Dialog, Dropdown, Form, Icons)
- **Radix Colors** — Professional color system

### Tooling

- **pnpm** — Fast, disk space efficient package manager
- **ESLint** — Code linting
- **Husky** — Git hooks

## 🏗️ Architecture Highlights

### Prisma 7 Custom Configuration

- **Custom client output**: Generates to `dist/prisma` (not default `node_modules/.prisma`)
- **Import pattern**: Always import from `dist/prisma`, never `@prisma/client`
- **No embedded URL**: Schema has no `url` field; CLI reads from `prisma.config.ts`
- **Runtime connection**: Uses driver adapter in `src/lib/prisma/prisma.ts`
- **Server-only**: Prisma client has `import 'server-only'` — build fails if Client Components try to import it
- **Environment loading**: `prisma.config.ts` explicitly loads `dotenv/config` (Prisma 7 CLI doesn't auto-load)

### Apollo GraphQL Integration

- **Separate backend**: Apollo server runs at `http://localhost:4000/graphql` (not a Next.js API route)
- **Client-side only**: Auth middleware reads from `localStorage` — no SSR usage
- **Authentication**: Session token automatically attached to GraphQL requests

### Component Architecture

- **Atomic Design Pattern**: Components organized as Atoms → Molecules → Organisms
- **Location**: All UI components live in `src/app/_ui/`
- **Path aliases**:
  - `ui/*` → `src/app/_ui/*`
  - `@/*` → `src/*`
  - `@@/*` → project root

## 📋 Prerequisites

- **Node.js 18+**
- **pnpm** (recommended) or npm/yarn
- **PostgreSQL** database
- **Apollo GraphQL server** running on port 4000 (separate game backend)

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Setup

Create a `.env` file in the project root with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/black_skies"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers (if using)
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"
```

### 3. Database Setup

```bash
# Generate Prisma client
pnpm db-generate

# Run migrations
pnpm db-migrate-dev

# Or push schema without migrations (development only)
pnpm db-push
```

### 4. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
Black_Skies/
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Migration history (do NOT edit existing)
├── public/                        # Static assets
│   ├── Discord/                   # Discord fonts
│   └── Google/                    # Google fonts
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   ├── _ui/                   # UI components (atomic design)
│   │   │   ├── atoms/             # Smallest components
│   │   │   ├── molecules/         # Compound components
│   │   │   └── organisms/         # Complex feature components
│   │   ├── api/
│   │   │   └── auth/              # NextAuth API routes (SENSITIVE)
│   │   ├── auth/                  # Auth pages (login, register, logout)
│   │   └── profile/               # User profile pages
│   └── lib/
│       ├── apollo/                # Apollo GraphQL client setup
│       │   ├── apolloClient.ts
│       │   └── schema.graphql
│       ├── prisma/
│       │   └── prisma.ts          # Prisma client instance (SERVER ONLY)
│       ├── providers/             # React context providers
│       │   ├── ApolloProvider.tsx
│       │   ├── AuthProvider.tsx   # (SENSITIVE)
│       │   └── DashProvider.tsx
│       ├── state/                 # Redux store setup
│       │   ├── app/
│       │   └── reducers/
│       ├── schemas/               # Validation schemas
│       │   └── yup/
│       ├── styled/                # styled-components global config
│       ├── types/                 # TypeScript type definitions
│       └── validators/            # Custom validators
├── prisma.config.ts               # Prisma 7 CLI configuration
├── CLAUDE.md                      # AI assistant project rules
└── package.json
```

## 🔄 Development Workflow

### Gitflow Branch Strategy

- **`main`** — Production releases only
- **`dev`** — Active development branch
- **Feature branches** — Branch from `dev`, PR back to `dev`

```bash
# Start new feature
git checkout dev
git pull origin dev
git checkout -b feature/your-feature-name

# Work on feature...

# When ready, create PR targeting `dev`
```

### Database Migrations

```bash
# Create new migration (auto-generates migration files)
pnpm db-migrate-dev

# Apply migrations to production
pnpm db-migrate-deploy

# Reset database (DESTRUCTIVE - dev only)
pnpm db-migrate-reset

# Pull schema from existing database
pnpm db-pull

# Push schema without migrations (dev only)
pnpm db-push
```

**⚠️ CRITICAL**: Never edit existing files in `prisma/migrations/`. Always create new migrations.

## 🔐 Authentication

- **Provider**: NextAuth 4.24 with Prisma adapter
- **Session strategy**: Database sessions
- **Models**: `User`, `Account`, `Session`, `VerificationToken`
- **Protected routes**: Use middleware or `getServerSession` in Server Components
- **Sensitive files**:
  - `src/app/api/auth/` — No edits without explicit approval
  - `src/lib/providers/AuthProvider.tsx` — No edits without explicit approval

### User Model Features

- **Unique username** (3-30 characters)
- **Optional nickname** (display name, up to 90 characters)
- **Email verification** support
- **OAuth integration** (GitHub, etc.)
- **IP-based ban system** (`Banned` relation)
- **Pilot dossier** (character profile with skill sheet, traits, bio)

## 🎮 Game Integration

### Apollo GraphQL Backend

The application connects to a separate Apollo GraphQL server for game-specific operations:

- **Endpoint**: `http://localhost:4000/graphql`
- **Authentication**: Session token from `localStorage` attached to all requests
- **Client location**: `src/lib/apollo/apolloClient.ts`
- **Schema**: `src/lib/apollo/schema.graphql`

**Note**: Apollo client is client-side only — auth middleware uses `localStorage`.

## 🎨 Styling

### styled-components

- **Version**: 6.4 with full SSR support
- **Registry**: Custom registry in `src/lib/styled/StyledRegistry.tsx`
- **Global styles**: `src/lib/styled/GlobalStyles.ts`
- **Global fonts**: `src/lib/styled/GlobalFonts.ts`

### Design System

- **Radix Colors**: Professional, accessible color palette
- **Radix UI**: Unstyled, accessible component primitives
- **Atomic Design**: Components organized by complexity level

## 📝 Key Conventions

### Import Paths

```typescript
// UI components
import { Button } from 'ui/atoms/Button';

// Lib utilities
import { prisma } from '@/lib/prisma/prisma';

// Root-level config
import config from '@@/prisma.config';
```

### Database Schema Patterns

- **`expiresAt: null`** on `Banned` model = permanent ban
- Always check `expiresAt` before applying expiry logic
- Use `cuid()` for IDs (collision-resistant, sortable)

### Component Guidelines

- **Client Components**: Explicitly mark with `'use client'` directive
- **Server Components**: Default — keep for data fetching & non-interactive UI
- **Prisma imports**: Server Components/Actions only — never in Client Components
- **Memoization**: Use `React.memo`, `useCallback`, `useMemo` for performance (see user memory)

## 🧪 Testing

Currently in active development. Testing setup to be added.

## 🚢 Deployment

### Build for Production

```bash
pnpm build
pnpm start
```

### Environment Variables (Production)

Ensure all environment variables are set in your production environment:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- OAuth provider credentials (if using)

### Prisma Migrations

Always run migrations in production:

```bash
pnpm db-migrate-deploy
```

## 🤝 Contributing

1. Branch from `dev`
2. Follow existing code structure (atomic design, path aliases)
3. Never edit existing migration files
4. Test authentication flows before committing
5. Use TypeScript strictly (no `any` types)
6. Keep Prisma imports server-side only
7. Create PR targeting `dev` branch

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [styled-components Documentation](https://styled-components.com/docs)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)

## 📄 License

Private project. All rights reserved.
