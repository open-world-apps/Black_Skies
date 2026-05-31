# Storybook Implementation Design

**Date:** 2026-05-31  
**Branch:** ui (branch from dev)  
**Scope:** Config + all atoms + molecules

---

## Context

Black Skies has ~47 UI components in an atomic design hierarchy (atoms → molecules → organisms) under `src/app/_ui/`. There is no Storybook setup. Adding Storybook provides isolated component development, visual regression baseline, and a static deployable component library.

---

## Framework

**`@storybook/nextjs`** — official Next.js framework for Storybook 8.

Rationale:
- SWC styled-components transform works identically to `next.config.mjs` compiler config
- `'use client'` directives are no-ops (not errors)
- `next/image`, `next/navigation`, `next/link` auto-mocked
- No manual Babel config needed

---

## Config Files

### `.storybook/main.ts`

```typescript
import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.resolve!.alias = {
      ...config.resolve!.alias,
      'ui': path.resolve(__dirname, '../src/app/_ui'),
      '@': path.resolve(__dirname, '../src'),
      '@@': path.resolve(__dirname, '..'),
    };
    return config;
  },
};
export default config;
```

Key points:
- `stories` glob picks up all `.stories.tsx` co-located with components
- `staticDirs: ['../public']` serves `/public/Discord/` fonts so `GlobalFonts` createGlobalStyle works
- `webpackFinal` resolves `ui/*`, `@/*`, `@@/*` aliases to match tsconfig paths

### `.storybook/preview.tsx`

```tsx
import type { Preview } from '@storybook/react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import { makeStore } from '@/lib/state/app/store';
import { GlobalFonts } from '@/lib/styled/GlobalFonts';
import { GlobalStyles } from '@/lib/styled/GlobalStyles';

const store = makeStore();

const withProviders = (Story: React.ComponentType) => (
  <ReduxProvider store={store}>
    <MockedProvider mocks={[]} addTypename={false}>
      <GlobalFonts />
      <GlobalStyles />
      <Story />
    </MockedProvider>
  </ReduxProvider>
);

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    backgrounds: {
      default: 'bs-dark',
      values: [
        { name: 'bs-dark', value: '#06080d' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    layout: 'centered',
  },
};

export default preview;
```

Key points:
- Single `makeStore()` instance shared across all stories (sufficient for UI-only stories)
- `MockedProvider` with empty mocks = passthrough; components that fire Apollo queries silently get no data
- `GlobalFonts` + `GlobalStyles` inject CSS vars and font-face rules globally
- Default background matches `--bs-bg` so components look correct without manual toggle
- `AuthProvider` is NOT included — stories don't need auth session context; components that call `useSession()` get `null` gracefully

### `package.json` scripts (add)

```json
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build -o storybook-static"
```

### `.gitignore` (add)

```
storybook-static/
```

---

## Story Convention

**Location:** Co-located with component file.

```
src/app/_ui/atoms/buttons/GlowButton.tsx
src/app/_ui/atoms/buttons/GlowButton.stories.tsx  ← new
```

**Template:**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Atoms/SubDir/ComponentName',  // matches atomic path
  component: ComponentName,
};
export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = { args: { /* minimal required props */ } };
// + variant stories for meaningful prop combinations
```

**Title hierarchy:**
- `Atoms/Buttons/GlowButton`
- `Atoms/Display/Stat`
- `Molecules/Landing/Brand`
- `Molecules/Forms/ValField`
- etc.

**Variant rule:** One story per meaningful prop combination. For boolean props (wide, disabled, error), add a variant. For union props (kind: 'a' | 't'), add a story per variant.

---

## Coverage

### Atoms (22 components)

| Directory | Components |
|-----------|-----------|
| buttons | GlowButton, Tab |
| display | ModChip, RiskPips, Stat, StrengthMeter |
| effects | Cursor, Scanlines, Starfield |
| forms | Field |
| icons | Glyph, LiveDot |
| layout | CornerFrame, FeedFrame, FeedHeaderContainer, FullscreenPage, HeroGrid |
| text | Eyebrow, FootNote, Hint, StatusMessage, Wordmark |

### Molecules (25 components)

| Directory | Components |
|-----------|-----------|
| forms | CheckRow, DOBField, FactionSelect, SelectField, TextArea, ValField |
| intake | DossierRow, FactionCard, GenesisSubstepRail, RailStep, SkillBar, StarMap, StepHead, SubRailStep, TraitCard |
| landing | AuthForm, AuthTabs, Brand, ConsoleBox, FeedHeader, HeroBackground, HeroContent, Stats, StatusIndicator |
| layout | NavRow |

**react-hook-form molecules** (AuthForm, DOBField, ValField, etc.): stories render with basic args, no RHF FormProvider wrapper. These test visual appearance, not form submission.

---

## Packages to Install

```bash
pnpm add -D storybook @storybook/nextjs @storybook/react @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-a11y @storybook/blocks
```

`@apollo/client/testing` (MockedProvider) is already part of `@apollo/client` — no extra install.

---

## Deploy

`pnpm build-storybook` outputs to `storybook-static/` — drop on any static host. Directory is gitignored.

---

## Verification

1. `pnpm storybook` → browser opens at `localhost:6006`, dark background, all CSS vars applied, fonts load
2. Navigate to `Atoms/Buttons/GlowButton` → glow effect visible, `kind` variants distinct
3. Navigate to `Molecules/Landing/Brand` → custom font + icon render correctly
4. Navigate to `Atoms/Effects/Starfield` → animation runs in canvas/div
5. `pnpm build-storybook` → completes without error, `storybook-static/index.html` exists
6. A11y addon panel shows no critical violations on atom stories
