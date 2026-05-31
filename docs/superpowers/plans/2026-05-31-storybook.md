# Storybook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install and configure Storybook 8 with `@storybook/nextjs`, then write stories for all 22 atoms and 25 molecules under `src/app/_ui/`.

**Architecture:** `@storybook/nextjs` framework wraps Next.js SWC so styled-components compile identically to the app. A global decorator injects `GlobalStyles`+`GlobalFonts` (CSS vars + fonts) plus passthrough `ReduxProvider` and `MockedProvider`. Stories co-locate with their components as `.stories.tsx` files.

**Tech Stack:** Storybook 8, `@storybook/nextjs`, `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/addon-a11y`, styled-components 6, `@apollo/client/testing` (MockedProvider), `@reduxjs/toolkit`

---

## Files to Create

```
.storybook/main.ts               — framework, addons, stories glob, alias config, staticDir
.storybook/preview.tsx           — global decorator, background, layout params

src/app/_ui/atoms/buttons/GlowButton.stories.tsx
src/app/_ui/atoms/buttons/Tab.stories.tsx
src/app/_ui/atoms/display/ModChip.stories.tsx
src/app/_ui/atoms/display/RiskPips.stories.tsx
src/app/_ui/atoms/display/Stat.stories.tsx
src/app/_ui/atoms/display/StrengthMeter.stories.tsx
src/app/_ui/atoms/effects/Cursor.stories.tsx
src/app/_ui/atoms/effects/Scanlines.stories.tsx
src/app/_ui/atoms/effects/Starfield.stories.tsx
src/app/_ui/atoms/forms/Field.stories.tsx
src/app/_ui/atoms/icons/Glyph.stories.tsx
src/app/_ui/atoms/icons/LiveDot.stories.tsx
src/app/_ui/atoms/layout/CornerFrame.stories.tsx
src/app/_ui/atoms/layout/FeedFrame.stories.tsx
src/app/_ui/atoms/layout/FeedHeaderContainer.stories.tsx
src/app/_ui/atoms/layout/FullscreenPage.stories.tsx
src/app/_ui/atoms/layout/HeroGrid.stories.tsx
src/app/_ui/atoms/text/Eyebrow.stories.tsx
src/app/_ui/atoms/text/FootNote.stories.tsx
src/app/_ui/atoms/text/Hint.stories.tsx
src/app/_ui/atoms/text/StatusMessage.stories.tsx
src/app/_ui/atoms/text/Wordmark.stories.tsx

src/app/_ui/molecules/forms/CheckRow.stories.tsx
src/app/_ui/molecules/forms/DOBField.stories.tsx
src/app/_ui/molecules/forms/FactionSelect.stories.tsx
src/app/_ui/molecules/forms/SelectField.stories.tsx
src/app/_ui/molecules/forms/TextArea.stories.tsx
src/app/_ui/molecules/forms/ValField.stories.tsx
src/app/_ui/molecules/intake/DossierRow.stories.tsx
src/app/_ui/molecules/intake/FactionCard.stories.tsx
src/app/_ui/molecules/intake/GenesisSubstepRail.stories.tsx
src/app/_ui/molecules/intake/RailStep.stories.tsx
src/app/_ui/molecules/intake/SkillBar.stories.tsx
src/app/_ui/molecules/intake/StarMap.stories.tsx
src/app/_ui/molecules/intake/StepHead.stories.tsx
src/app/_ui/molecules/intake/SubRailStep.stories.tsx
src/app/_ui/molecules/intake/TraitCard.stories.tsx
src/app/_ui/molecules/landing/AuthForm.stories.tsx
src/app/_ui/molecules/landing/AuthTabs.stories.tsx
src/app/_ui/molecules/landing/Brand.stories.tsx
src/app/_ui/molecules/landing/ConsoleBox.stories.tsx
src/app/_ui/molecules/landing/FeedHeader.stories.tsx
src/app/_ui/molecules/landing/HeroBackground.stories.tsx
src/app/_ui/molecules/landing/HeroContent.stories.tsx
src/app/_ui/molecules/landing/Stats.stories.tsx
src/app/_ui/molecules/landing/StatusIndicator.stories.tsx
src/app/_ui/molecules/layout/NavRow.stories.tsx
```

## Files to Modify

```
package.json       — add "storybook" and "build-storybook" scripts
.gitignore         — add storybook-static/
```

---

## Task 1: Install Storybook packages

**Files:** `package.json`

- [ ] **Step 1: Install packages**

```bash
cd /home/brian/Documents/c0de_box/www/Black_Skies
pnpm add -D storybook @storybook/nextjs @storybook/react @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-a11y @storybook/blocks
```

- [ ] **Step 2: Verify install succeeded**

```bash
pnpm storybook --version
```

Expected: prints a version number like `8.x.x`. If the `@storybook/nextjs` peer-dep range rejects Next.js 16, install `@storybook/react-vite` instead and adjust Task 2 accordingly. If so, also install `vite` and `@vitejs/plugin-react`.

---

## Task 2: Create Storybook main config

**Files:** Create `.storybook/main.ts`

- [ ] **Step 1: Create `.storybook/main.ts`**

```typescript
import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
      ui: path.resolve(__dirname, '../src/app/_ui'),
      '@': path.resolve(__dirname, '../src'),
      '@@': path.resolve(__dirname, '..'),
    };
    return config;
  },
};

export default config;
```

Note: `staticDirs: ['../public']` serves `/public/Discord/` fonts so `GlobalFonts` `@font-face` rules resolve. `webpackFinal` adds the three path aliases from `tsconfig.json`.

---

## Task 3: Create Storybook preview

**Files:** Create `.storybook/preview.tsx`

- [ ] **Step 1: Create `.storybook/preview.tsx`**

```tsx
import type { Preview } from '@storybook/react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import { makeStore } from '../src/lib/state/app/store';
import { GlobalFonts } from '../src/lib/styled/GlobalFonts'; // named export
import GlobalStyles from '../src/lib/styled/GlobalStyles';   // default export

// Single store instance shared across stories — sufficient for visual-only stories.
// If a story needs isolated state, wrap it in its own ReduxProvider.
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

Note: `AuthProvider` (next-auth) is intentionally excluded — it touches cookies/session and is off-limits without approval. Components calling `useSession()` will get `null` gracefully.

---

## Task 4: Add scripts and gitignore entry

**Files:** `package.json`, `.gitignore`

- [ ] **Step 1: Add scripts to package.json**

In `package.json`, add to the `"scripts"` object (after `"start"`):

```json
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build -o storybook-static",
```

- [ ] **Step 2: Add to .gitignore**

Append to `.gitignore`:

```
# Storybook static export
storybook-static/
```

- [ ] **Step 3: Smoke-test Storybook starts**

```bash
pnpm storybook
```

Expected: browser opens at `http://localhost:6006`, dark background (#06080d), no JS errors in console. Storybook shows empty stories panel (no stories yet). Stop the server with Ctrl+C.

- [ ] **Step 4: Commit config**

```bash
git add .storybook/ package.json .gitignore
git commit -m "feat: add Storybook config with NextJS framework, styled-components, Redux+Apollo decorators"
```

---

## Task 5: Atom button stories

**Files:**
- Create: `src/app/_ui/atoms/buttons/GlowButton.stories.tsx`
- Create: `src/app/_ui/atoms/buttons/Tab.stories.tsx`

- [ ] **Step 1: Create GlowButton stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import GlowButton from './GlowButton';

const meta: Meta<typeof GlowButton> = {
  title: 'Atoms/Buttons/GlowButton',
  component: GlowButton,
};
export default meta;
type Story = StoryObj<typeof GlowButton>;

export const Default: Story = {
  args: { children: 'ENGAGE' },
};

export const Teal: Story = {
  args: { children: 'CONFIRM', kind: 't' },
};

export const Wide: Story = {
  args: { children: 'ENTER THE VOID', wide: true },
};

export const Disabled: Story = {
  args: { children: 'OFFLINE', disabled: true },
};
```

- [ ] **Step 2: Create Tab stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Tab from './Tab';

const meta: Meta<typeof Tab> = {
  title: 'Atoms/Buttons/Tab',
  component: Tab,
  args: { onClick: () => {} },
};
export default meta;
type Story = StoryObj<typeof Tab>;

export const Active: Story = {
  args: { children: 'LOGIN', active: true },
};

export const Inactive: Story = {
  args: { children: 'REGISTER', active: false },
};
```

- [ ] **Step 3: Verify in Storybook**

```bash
pnpm storybook
```

Navigate to `Atoms/Buttons/GlowButton`. Verify amber glow on hover for Default, teal for Teal variant, muted border for Disabled. Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/app/_ui/atoms/buttons/
git commit -m "feat(stories): GlowButton + Tab atom stories"
```

---

## Task 6: Atom display stories

**Files:**
- Create: `src/app/_ui/atoms/display/ModChip.stories.tsx`
- Create: `src/app/_ui/atoms/display/RiskPips.stories.tsx`
- Create: `src/app/_ui/atoms/display/Stat.stories.tsx`
- Create: `src/app/_ui/atoms/display/StrengthMeter.stories.tsx`

- [ ] **Step 1: Create ModChip stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import ModChip from './ModChip';

const meta: Meta<typeof ModChip> = {
  title: 'Atoms/Display/ModChip',
  component: ModChip,
};
export default meta;
type Story = StoryObj<typeof ModChip>;

export const Positive: Story = {
  args: { label: 'PILOTING', v: 3 },
};

export const Negative: Story = {
  args: { label: 'SOCIAL', v: -2 },
};
```

- [ ] **Step 2: Create RiskPips stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import RiskPips from './RiskPips';

const meta: Meta<typeof RiskPips> = {
  title: 'Atoms/Display/RiskPips',
  component: RiskPips,
};
export default meta;
type Story = StoryObj<typeof RiskPips>;

export const Low: Story = { args: { n: 1 } };
export const Medium: Story = { args: { n: 3 } };
export const High: Story = { args: { n: 4 } };
export const Max: Story = { args: { n: 5 } };
```

- [ ] **Step 3: Create Stat stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Stat from './Stat';

const meta: Meta<typeof Stat> = {
  title: 'Atoms/Display/Stat',
  component: Stat,
};
export default meta;
type Story = StoryObj<typeof Stat>;

export const Default: Story = {
  args: { value: '1,204', label: 'PILOTS LOST' },
};

export const WithReactNode: Story = {
  args: { value: '∞', label: 'VOIDS CROSSED' },
};
```

- [ ] **Step 4: Create StrengthMeter stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import StrengthMeter from './StrengthMeter';

const meta: Meta<typeof StrengthMeter> = {
  title: 'Atoms/Display/StrengthMeter',
  component: StrengthMeter,
};
export default meta;
type Story = StoryObj<typeof StrengthMeter>;

export const Empty: Story = { args: { pw: '' } };
export const Weak: Story = { args: { pw: 'abc' } };
export const Adequate: Story = { args: { pw: 'Abc12345' } };
export const Ironclad: Story = { args: { pw: 'V0id!Bl@ck$k135' } };
```

- [ ] **Step 5: Commit**

```bash
git add src/app/_ui/atoms/display/
git commit -m "feat(stories): ModChip, RiskPips, Stat, StrengthMeter atom stories"
```

---

## Task 7: Atom effects stories

**Files:**
- Create: `src/app/_ui/atoms/effects/Cursor.stories.tsx`
- Create: `src/app/_ui/atoms/effects/Scanlines.stories.tsx`
- Create: `src/app/_ui/atoms/effects/Starfield.stories.tsx`

- [ ] **Step 1: Create Cursor stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Cursor from './Cursor';

const meta: Meta<typeof Cursor> = {
  title: 'Atoms/Effects/Cursor',
  component: Cursor,
};
export default meta;
type Story = StoryObj<typeof Cursor>;

export const Visible: Story = { args: { visible: true } };
export const Hidden: Story = { args: { visible: false } };
```

- [ ] **Step 2: Create Scanlines stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Scanlines from './Scanlines';

const meta: Meta<typeof Scanlines> = {
  title: 'Atoms/Effects/Scanlines',
  component: Scanlines,
  // Scanlines renders as position:absolute overlay — give it a positioned parent
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 300, height: 200, background: '#1a2030' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Scanlines>;

export const Default: Story = {};
export const HalfStrength: Story = { args: { factor: 0.5 } };
export const FullStrength: Story = { args: { factor: 2 } };
```

- [ ] **Step 3: Create Starfield stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Starfield from './Starfield';

const meta: Meta<typeof Starfield> = {
  title: 'Atoms/Effects/Starfield',
  component: Starfield,
  // Starfield uses position:absolute and reads parentElement dimensions
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 600, height: 300, background: '#05060a' }}>
        <Story />
      </div>
    ),
  ],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof Starfield>;

export const Default: Story = {};
export const Dense: Story = { args: { count: 320, twinkle: true } };
export const SlowDrift: Story = { args: { count: 80, drift: 0.005 } };
export const NoTwinkle: Story = { args: { twinkle: false } };
```

- [ ] **Step 4: Commit**

```bash
git add src/app/_ui/atoms/effects/
git commit -m "feat(stories): Cursor, Scanlines, Starfield atom stories"
```

---

## Task 8: Atom forms + icons stories

**Files:**
- Create: `src/app/_ui/atoms/forms/Field.stories.tsx`
- Create: `src/app/_ui/atoms/icons/Glyph.stories.tsx`
- Create: `src/app/_ui/atoms/icons/LiveDot.stories.tsx`

- [ ] **Step 1: Create Field stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Field from './Field';

const meta: Meta<typeof Field> = {
  title: 'Atoms/Forms/Field',
  component: Field,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Field>;

// Field requires controlled value+onChange — use a render fn
export const Default: Story = {
  render: () => {
    const [v, setV] = useState('');
    return <Field label="HANDLE" value={v} onChange={setV} placeholder="enter callsign" />;
  },
};

export const Password: Story = {
  render: () => {
    const [v, setV] = useState('');
    return <Field label="ACCESS KEY" value={v} onChange={setV} type="password" placeholder="••••••••" />;
  },
};

export const Prefilled: Story = {
  render: () => {
    const [v, setV] = useState('void_runner_7');
    return <Field label="CALLSIGN" value={v} onChange={setV} />;
  },
};
```

- [ ] **Step 2: Create Glyph stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Glyph from './Glyph';
import type { GlyphType } from '@/lib/intake/types';

const meta: Meta<typeof Glyph> = {
  title: 'Atoms/Icons/Glyph',
  component: Glyph,
  argTypes: {
    type: {
      control: 'select',
      options: ['ring', 'dot', 'diamond', 'chevron', 'cross', 'bars', 'node', 'arrow'] satisfies GlyphType[],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Glyph>;

export const Ring: Story = { args: { type: 'ring', size: 24, c: 'var(--bs-accent)' } };
export const Dot: Story = { args: { type: 'dot', size: 24, c: 'var(--bs-accent2)' } };
export const Diamond: Story = { args: { type: 'diamond', size: 24, c: '#fff' } };
export const Chevron: Story = { args: { type: 'chevron', size: 24, c: 'var(--bs-ink-dim)' } };
export const Cross: Story = { args: { type: 'cross', size: 24, c: '#d8533f' } };
export const Bars: Story = { args: { type: 'bars', size: 24, c: 'var(--bs-accent2)' } };
export const Node: Story = { args: { type: 'node', size: 24, c: 'var(--bs-accent)' } };
export const Arrow: Story = { args: { type: 'arrow', size: 24, c: '#fff' } };
```

- [ ] **Step 3: Create LiveDot stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import LiveDot from './LiveDot';

const meta: Meta<typeof LiveDot> = {
  title: 'Atoms/Icons/LiveDot',
  component: LiveDot,
};
export default meta;
type Story = StoryObj<typeof LiveDot>;

export const Default: Story = {};
export const Streaming: Story = { args: { status: 'streaming' } };
export const Inactive: Story = { args: { status: 'inactive' } };
```

- [ ] **Step 4: Commit**

```bash
git add src/app/_ui/atoms/forms/ src/app/_ui/atoms/icons/
git commit -m "feat(stories): Field, Glyph, LiveDot atom stories"
```

---

## Task 9: Atom layout stories

**Files:**
- Create: `src/app/_ui/atoms/layout/CornerFrame.stories.tsx`
- Create: `src/app/_ui/atoms/layout/FeedFrame.stories.tsx`
- Create: `src/app/_ui/atoms/layout/FeedHeaderContainer.stories.tsx`
- Create: `src/app/_ui/atoms/layout/FullscreenPage.stories.tsx`
- Create: `src/app/_ui/atoms/layout/HeroGrid.stories.tsx`

- [ ] **Step 1: Create CornerFrame stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import CornerFrame from './CornerFrame';

const meta: Meta<typeof CornerFrame> = {
  title: 'Atoms/Layout/CornerFrame',
  component: CornerFrame,
};
export default meta;
type Story = StoryObj<typeof CornerFrame>;

export const Default: Story = {
  args: {
    children: <div style={{ padding: 24, color: 'var(--bs-ink)' }}>Content inside frame</div>,
  },
};

export const AccentColor: Story = {
  args: {
    color: 'var(--bs-accent)',
    len: 20,
    children: <div style={{ padding: 24, color: 'var(--bs-ink)' }}>Amber corners</div>,
  },
};

export const Teal: Story = {
  args: {
    color: 'var(--bs-accent2)',
    len: 10,
    children: <div style={{ padding: 24, color: 'var(--bs-ink)' }}>Teal corners</div>,
  },
};
```

- [ ] **Step 2: Create FeedFrame stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import FeedFrame from './FeedFrame';

const meta: Meta<typeof FeedFrame> = {
  title: 'Atoms/Layout/FeedFrame',
  component: FeedFrame,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof FeedFrame>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: 16, color: 'var(--bs-ink-dim)', fontFamily: 'var(--bs-mono)', fontSize: 12 }}>
        Feed content goes here
      </div>
    ),
  },
};
```

- [ ] **Step 3: Create FeedHeaderContainer stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import FeedHeaderContainer from './FeedHeaderContainer';

const meta: Meta<typeof FeedHeaderContainer> = {
  title: 'Atoms/Layout/FeedHeaderContainer',
  component: FeedHeaderContainer,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof FeedHeaderContainer>;

export const Default: Story = {
  args: {
    children: (
      <>
        <span style={{ color: 'var(--bs-ink)', fontFamily: 'var(--bs-mono)', fontSize: 11 }}>LEFT</span>
        <span style={{ color: 'var(--bs-accent)', fontFamily: 'var(--bs-mono)', fontSize: 11 }}>RIGHT</span>
      </>
    ),
  },
};
```

- [ ] **Step 4: Create FullscreenPage stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import FullscreenPage from './FullscreenPage';

const meta: Meta<typeof FullscreenPage> = {
  title: 'Atoms/Layout/FullscreenPage',
  component: FullscreenPage,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof FullscreenPage>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: 40, fontFamily: 'var(--bs-mono)', fontSize: 12, color: 'var(--bs-ink-dim)' }}>
        Fullscreen page content
      </div>
    ),
  },
};
```

- [ ] **Step 5: Create HeroGrid stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import HeroGrid from './HeroGrid';

const meta: Meta<typeof HeroGrid> = {
  title: 'Atoms/Layout/HeroGrid',
  component: HeroGrid,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#05060a' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof HeroGrid>;

export const Default: Story = {
  args: {
    children: (
      <>
        <div style={{ color: 'var(--bs-ink)', fontFamily: 'var(--bs-mono)', fontSize: 12 }}>LEFT COLUMN</div>
        <div style={{ color: 'var(--bs-accent)', fontFamily: 'var(--bs-mono)', fontSize: 12 }}>RIGHT COLUMN</div>
      </>
    ),
  },
};
```

- [ ] **Step 6: Commit**

```bash
git add src/app/_ui/atoms/layout/
git commit -m "feat(stories): atom layout stories (CornerFrame, FeedFrame, FeedHeaderContainer, FullscreenPage, HeroGrid)"
```

---

## Task 10: Atom text stories

**Files:**
- Create: `src/app/_ui/atoms/text/Eyebrow.stories.tsx`
- Create: `src/app/_ui/atoms/text/FootNote.stories.tsx`
- Create: `src/app/_ui/atoms/text/Hint.stories.tsx`
- Create: `src/app/_ui/atoms/text/StatusMessage.stories.tsx`
- Create: `src/app/_ui/atoms/text/Wordmark.stories.tsx`

- [ ] **Step 1: Create Eyebrow stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Eyebrow from './Eyebrow';

const meta: Meta<typeof Eyebrow> = {
  title: 'Atoms/Text/Eyebrow',
  component: Eyebrow,
};
export default meta;
type Story = StoryObj<typeof Eyebrow>;

export const Default: Story = { args: { children: 'SECTOR · DEEP REACH' } };
```

- [ ] **Step 2: Create FootNote stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import FootNote from './FootNote';

const meta: Meta<typeof FootNote> = {
  title: 'Atoms/Text/FootNote',
  component: FootNote,
};
export default meta;
type Story = StoryObj<typeof FootNote>;

export const Default: Story = {
  args: { children: 'no account survives the dark unaided.' },
};
```

- [ ] **Step 3: Create Hint stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Hint from './Hint';

const meta: Meta<typeof Hint> = {
  title: 'Atoms/Text/Hint',
  component: Hint,
};
export default meta;
type Story = StoryObj<typeof Hint>;

export const Idle: Story = {};
export const Error: Story = { args: { error: 'callsign required — the void needs a name' } };
export const Ok: Story = { args: { ok: 'handle available' } };
```

- [ ] **Step 4: Create StatusMessage stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import StatusMessage from './StatusMessage';

const meta: Meta<typeof StatusMessage> = {
  title: 'Atoms/Text/StatusMessage',
  component: StatusMessage,
};
export default meta;
type Story = StoryObj<typeof StatusMessage>;

export const ErrorState: Story = {
  args: { type: 'error', children: 'access denied — credentials rejected' },
};

export const Working: Story = {
  args: { type: 'working', children: 'authenticating pilot', showCursor: true },
};
```

- [ ] **Step 5: Create Wordmark stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Wordmark from './Wordmark';

const meta: Meta<typeof Wordmark> = {
  title: 'Atoms/Text/Wordmark',
  component: Wordmark,
};
export default meta;
type Story = StoryObj<typeof Wordmark>;

export const Default: Story = {};
```

- [ ] **Step 6: Commit**

```bash
git add src/app/_ui/atoms/text/
git commit -m "feat(stories): atom text stories (Eyebrow, FootNote, Hint, StatusMessage, Wordmark)"
```

---

## Task 11: Molecule forms stories

**Files:**
- Create: `src/app/_ui/molecules/forms/CheckRow.stories.tsx`
- Create: `src/app/_ui/molecules/forms/DOBField.stories.tsx`
- Create: `src/app/_ui/molecules/forms/FactionSelect.stories.tsx`
- Create: `src/app/_ui/molecules/forms/SelectField.stories.tsx`
- Create: `src/app/_ui/molecules/forms/TextArea.stories.tsx`
- Create: `src/app/_ui/molecules/forms/ValField.stories.tsx`

- [ ] **Step 1: Create CheckRow stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CheckRow from './CheckRow';

const meta: Meta<typeof CheckRow> = {
  title: 'Molecules/Forms/CheckRow',
  component: CheckRow,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof CheckRow>;

export const Unchecked: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <CheckRow checked={checked} onChange={setChecked}>
        I accept the terms and conditions of the void
      </CheckRow>
    );
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <CheckRow checked={checked} onChange={setChecked}>
        I accept the terms and conditions of the void
      </CheckRow>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <CheckRow checked={checked} onChange={setChecked} error="you must agree to enter the void" touched>
        I accept the terms and conditions of the void
      </CheckRow>
    );
  },
};
```

- [ ] **Step 2: Create DOBField stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DOBField from './DOBField';
import type { DOB, DobResult } from '@/lib/intake/types';

const meta: Meta<typeof DOBField> = {
  title: 'Molecules/Forms/DOBField',
  component: DOBField,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof DOBField>;

const emptyDob: DOB = { d: '', m: '', y: '' };
const emptyResult: DobResult = { err: null, age: null };

export const Empty: Story = {
  render: () => {
    const [dob, setDob] = useState<DOB>(emptyDob);
    return <DOBField value={dob} onChange={setDob} result={emptyResult} />;
  },
};

export const Valid: Story = {
  render: () => {
    const [dob, setDob] = useState<DOB>({ d: '15', m: '06', y: '1990' });
    return (
      <DOBField
        value={dob}
        onChange={setDob}
        result={{ err: null, age: 35 }}
        touched
      />
    );
  },
};

export const Error: Story = {
  render: () => {
    const [dob, setDob] = useState<DOB>({ d: '01', m: '01', y: '2015' });
    return (
      <DOBField
        value={dob}
        onChange={setDob}
        result={{ err: 'must be 18+ to enter the void', age: null, blocked: true }}
        touched
      />
    );
  },
};
```

- [ ] **Step 3: Create FactionSelect stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FactionSelect from './FactionSelect';

const meta: Meta<typeof FactionSelect> = {
  title: 'Molecules/Forms/FactionSelect',
  component: FactionSelect,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof FactionSelect>;

const FACTIONS = ['Voidborn Compact', 'Iron Doctrine', 'Mirrorhand Guild', 'Free Reach'];

export const Default: Story = {
  render: () => {
    const [v, setV] = useState(FACTIONS[0]);
    return <FactionSelect value={v} factions={FACTIONS} onChange={setV} />;
  },
};
```

- [ ] **Step 4: Create SelectField stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SelectField from './SelectField';

const meta: Meta<typeof SelectField> = {
  title: 'Molecules/Forms/SelectField',
  component: SelectField,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof SelectField>;

const OPTIONS = ['Mercenary', 'Trader', 'Explorer', 'Bounty Hunter'];

export const Empty: Story = {
  render: () => {
    const [v, setV] = useState('');
    return <SelectField label="ARCHETYPE" value={v} onChange={setV} options={OPTIONS} />;
  },
};

export const Selected: Story = {
  render: () => {
    const [v, setV] = useState('Explorer');
    return <SelectField label="ARCHETYPE" value={v} onChange={setV} options={OPTIONS} touched />;
  },
};

export const WithError: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <SelectField
        label="ARCHETYPE"
        value={v}
        onChange={setV}
        options={OPTIONS}
        error="selection required"
        touched
      />
    );
  },
};
```

- [ ] **Step 5: Create TextArea stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TextArea from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Molecules/Forms/TextArea',
  component: TextArea,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof TextArea>;

export const Empty: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <TextArea
        label="BACKSTORY"
        value={v}
        onChange={setV}
        placeholder="describe your history in the void…"
        maxLen={400}
      />
    );
  },
};

export const Prefilled: Story = {
  render: () => {
    const [v, setV] = useState('Born on a derelict transport near the outer belt, I learned to trust no one and read the stars.');
    return (
      <TextArea
        label="BACKSTORY"
        value={v}
        onChange={setV}
        hint="400 CHAR MAX"
        maxLen={400}
        rows={5}
      />
    );
  },
};
```

- [ ] **Step 6: Create ValField stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ValField from './ValField';

const meta: Meta<typeof ValField> = {
  title: 'Molecules/Forms/ValField',
  component: ValField,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof ValField>;

export const Empty: Story = {
  render: () => {
    const [v, setV] = useState('');
    return <ValField label="CALLSIGN" value={v} onChange={setV} placeholder="3-18 chars" />;
  },
};

export const Valid: Story = {
  render: () => {
    const [v, setV] = useState('void_runner_7');
    return <ValField label="CALLSIGN" value={v} onChange={setV} valid touched />;
  },
};

export const Invalid: Story = {
  render: () => {
    const [v, setV] = useState('x');
    return (
      <ValField
        label="CALLSIGN"
        value={v}
        onChange={setV}
        error="too short — 3 characters minimum"
        touched
      />
    );
  },
};

export const Password: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <ValField
        label="ACCESS KEY"
        value={v}
        onChange={setV}
        type="password"
        placeholder="••••••••"
        hint="MIN 8 CHARS"
      />
    );
  },
};
```

- [ ] **Step 7: Commit**

```bash
git add src/app/_ui/molecules/forms/
git commit -m "feat(stories): molecule form stories (CheckRow, DOBField, FactionSelect, SelectField, TextArea, ValField)"
```

---

## Task 12: Molecule intake stories — part 1

**Files:**
- Create: `src/app/_ui/molecules/intake/DossierRow.stories.tsx`
- Create: `src/app/_ui/molecules/intake/FactionCard.stories.tsx`
- Create: `src/app/_ui/molecules/intake/RailStep.stories.tsx`
- Create: `src/app/_ui/molecules/intake/StepHead.stories.tsx`

- [ ] **Step 1: Create DossierRow stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import DossierRow from './DossierRow';

const meta: Meta<typeof DossierRow> = {
  title: 'Molecules/Intake/DossierRow',
  component: DossierRow,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof DossierRow>;

export const Default: Story = {
  args: { label: 'CALLSIGN', value: 'void_runner_7' },
};

export const WithAccent: Story = {
  args: { label: 'ARCHETYPE', value: 'VOID-BORN', accent: 'var(--bs-accent)' },
};

export const DisplayFont: Story = {
  args: { label: 'LOCATION', value: 'Sagittarius Reach', mono: false },
};
```

- [ ] **Step 2: Create FactionCard stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FactionCard from './FactionCard';
import type { Faction } from '@/lib/intake/types';

const meta: Meta<typeof FactionCard> = {
  title: 'Molecules/Intake/FactionCard',
  component: FactionCard,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof FactionCard>;

const SAMPLE_FACTION_A: Faction = {
  key: 'voidborn',
  name: 'VOIDBORN COMPACT',
  glyph: 'node',
  blurb: 'the oldest fleet cult in the reach',
  invitedBy: 'your lineage speaks for itself',
  perk: '+2 piloting on deep-void runs',
  cost: 'never step planetside again',
  home: 'Void Station Epsilon',
  accent: 'a',
};

const SAMPLE_FACTION_T: Faction = {
  key: 'irondoc',
  name: 'IRON DOCTRINE',
  glyph: 'cross',
  blurb: 'military remnants with long memories',
  invitedBy: 'your service record precedes you',
  perk: '+2 combat in contested space',
  cost: 'answer the call when it comes',
  home: 'Bastion Prime',
  accent: 't',
};

export const AmberUnselected: Story = {
  render: () => {
    const [sel, setSel] = useState(false);
    return <FactionCard f={SAMPLE_FACTION_A} selected={sel} onToggle={() => setSel(s => !s)} />;
  },
};

export const AmberSelected: Story = {
  render: () => {
    const [sel, setSel] = useState(true);
    return <FactionCard f={SAMPLE_FACTION_A} selected={sel} onToggle={() => setSel(s => !s)} />;
  },
};

export const TealUnselected: Story = {
  render: () => {
    const [sel, setSel] = useState(false);
    return <FactionCard f={SAMPLE_FACTION_T} selected={sel} onToggle={() => setSel(s => !s)} />;
  },
};
```

- [ ] **Step 3: Create RailStep stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import RailStep from './RailStep';

const meta: Meta<typeof RailStep> = {
  title: 'Molecules/Intake/RailStep',
  component: RailStep,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof RailStep>;

export const Done: Story = {
  args: { index: '01', label: 'CLEARANCE', sub: 'identity and age verification', status: 'done' },
};

export const Active: Story = {
  args: { index: '02', label: 'COMMISSION', sub: 'pilot class and starting skills', status: 'active' },
};

export const Upcoming: Story = {
  args: { index: '03', label: 'IDENTITY', sub: 'callsign and vital stats', status: 'upcoming' },
};

export const Locked: Story = {
  args: { index: '04', label: 'GENESIS', sub: 'full pilot creation', status: 'locked', last: true },
};
```

- [ ] **Step 4: Create StepHead stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import StepHead from './StepHead';

const meta: Meta<typeof StepHead> = {
  title: 'Molecules/Intake/StepHead',
  component: StepHead,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof StepHead>;

export const WithIndex: Story = {
  args: {
    index: '01',
    total: 4,
    kicker: 'CLEARANCE PROTOCOL',
    title: 'Verify Identity',
    blurb: 'The void does not forget. Confirm who you are before proceeding.',
  },
};

export const NoIndex: Story = {
  args: {
    kicker: 'GENESIS · ARCHETYPE',
    title: 'Choose Your Cast',
    blurb: 'Your archetype defines your inherited strengths and the skills you carry into the dark.',
  },
};

export const NoBlurb: Story = {
  args: {
    index: '02',
    kicker: 'COMMISSION',
    title: 'Commission',
  },
};
```

- [ ] **Step 5: Commit**

```bash
git add src/app/_ui/molecules/intake/DossierRow.stories.tsx \
        src/app/_ui/molecules/intake/FactionCard.stories.tsx \
        src/app/_ui/molecules/intake/RailStep.stories.tsx \
        src/app/_ui/molecules/intake/StepHead.stories.tsx
git commit -m "feat(stories): intake molecule stories part 1 (DossierRow, FactionCard, RailStep, StepHead)"
```

---

## Task 13: Molecule intake stories — part 2

**Files:**
- Create: `src/app/_ui/molecules/intake/GenesisSubstepRail.stories.tsx`
- Create: `src/app/_ui/molecules/intake/SkillBar.stories.tsx`
- Create: `src/app/_ui/molecules/intake/StarMap.stories.tsx`
- Create: `src/app/_ui/molecules/intake/SubRailStep.stories.tsx`
- Create: `src/app/_ui/molecules/intake/TraitCard.stories.tsx`

- [ ] **Step 1: Create SubRailStep stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import SubRailStep from './SubRailStep';

const meta: Meta<typeof SubRailStep> = {
  title: 'Molecules/Intake/SubRailStep',
  component: SubRailStep,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof SubRailStep>;

export const Done: Story = {
  args: { label: 'ARCHETYPE', status: 'done', onClick: () => {} },
};

export const Active: Story = {
  args: { label: 'DOSSIER', status: 'active' },
};

export const Upcoming: Story = {
  args: { label: 'SKILL FORGE', status: 'upcoming' },
};
```

- [ ] **Step 2: Create GenesisSubstepRail stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import GenesisSubstepRail from './GenesisSubstepRail';

const meta: Meta<typeof GenesisSubstepRail> = {
  title: 'Molecules/Intake/GenesisSubstepRail',
  component: GenesisSubstepRail,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof GenesisSubstepRail>;

export const AtStart: Story = {
  render: () => {
    const [sub, setSub] = useState(0);
    return <GenesisSubstepRail subIndex={sub} maxReached={0} onJump={setSub} />;
  },
};

export const MidProgress: Story = {
  render: () => {
    const [sub, setSub] = useState(3);
    return <GenesisSubstepRail subIndex={sub} maxReached={3} onJump={setSub} />;
  },
};
```

- [ ] **Step 3: Create SkillBar stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import SkillBar from './SkillBar';
import type { SkillRow } from '@/lib/intake/types';

const meta: Meta<typeof SkillBar> = {
  title: 'Molecules/Intake/SkillBar',
  component: SkillBar,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof SkillBar>;

const SAMPLE_SKILL: SkillRow = {
  key: 'piloting',
  label: 'PILOTING',
  cat: 'flight',
  base: 5,
  aMod: 3,
  bBonus: 1,
  total: 9,
};

const HIGH_SKILL: SkillRow = { ...SAMPLE_SKILL, key: 'combat', label: 'COMBAT', total: 13 };

export const Default: Story = {
  render: () => {
    const [reveal, setReveal] = useState(false);
    useEffect(() => { setTimeout(() => setReveal(true), 50); }, []);
    return <SkillBar sk={SAMPLE_SKILL} idx={0} reveal={reveal} />;
  },
};

export const High: Story = {
  render: () => {
    const [reveal, setReveal] = useState(false);
    useEffect(() => { setTimeout(() => setReveal(true), 50); }, []);
    return <SkillBar sk={HIGH_SKILL} idx={0} reveal={reveal} />;
  },
};
```

- [ ] **Step 4: Create StarMap stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import StarMap from './StarMap';
import type { SpawnNode } from '@/lib/intake/types';

const meta: Meta<typeof StarMap> = {
  title: 'Molecules/Intake/StarMap',
  component: StarMap,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof StarMap>;

const NODES: SpawnNode[] = [
  { key: 'station-a', label: 'ALPHA STATION', kind: 'station', blurb: 'safe harbor', x: 20, y: 25, risk: 1, perks: [], dangers: [], home: true, accent: 'a' },
  { key: 'belt-b', label: 'BELT SEVEN', kind: 'field', blurb: 'asteroid mining', x: 55, y: 40, risk: 3, perks: [], dangers: [] },
  { key: 'void-c', label: 'DARK VOID', kind: 'void', blurb: 'unknown space', x: 80, y: 70, risk: 5, perks: [], dangers: [] },
  { key: 'colony-d', label: 'COLONY REACH', kind: 'colony', blurb: 'frontier settlement', x: 35, y: 65, risk: 2, perks: [], dangers: [], accent: 't' },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return <StarMap nodes={NODES} selectedKey={selected} onSelect={setSelected} />;
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>('belt-b');
    return <StarMap nodes={NODES} selectedKey={selected} onSelect={setSelected} />;
  },
};
```

- [ ] **Step 5: Create TraitCard stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TraitCard from './TraitCard';
import type { TraitPair } from '@/lib/intake/types';

const meta: Meta<typeof TraitCard> = {
  title: 'Molecules/Intake/TraitCard',
  component: TraitCard,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof TraitCard>;

const SAMPLE_PAIR: TraitPair = {
  key: 'hawkeye',
  strong: 'Hawkeye',
  sDesc: 'Target acquisition is instinctive — you rarely miss under pressure.',
  weak: 'Tunnel Vision',
  wDesc: 'Peripheral threats go unnoticed while fixated on a target.',
  rationale: 'your archetype showed exceptional precision but narrow situational awareness',
};

export const Available: Story = {
  render: () => {
    const [sel, setSel] = useState(false);
    return <TraitCard pair={SAMPLE_PAIR} selected={sel} onToggle={() => setSel(s => !s)} />;
  },
};

export const Selected: Story = {
  render: () => {
    const [sel, setSel] = useState(true);
    return <TraitCard pair={SAMPLE_PAIR} selected={sel} onToggle={() => setSel(s => !s)} />;
  },
};

export const Locked: Story = {
  args: { pair: SAMPLE_PAIR, locked: true },
};

export const Disabled: Story = {
  render: () => {
    const [sel, setSel] = useState(false);
    return <TraitCard pair={SAMPLE_PAIR} disabled={!sel} onToggle={() => setSel(s => !s)} />;
  },
};
```

- [ ] **Step 6: Commit**

```bash
git add src/app/_ui/molecules/intake/GenesisSubstepRail.stories.tsx \
        src/app/_ui/molecules/intake/SkillBar.stories.tsx \
        src/app/_ui/molecules/intake/StarMap.stories.tsx \
        src/app/_ui/molecules/intake/SubRailStep.stories.tsx \
        src/app/_ui/molecules/intake/TraitCard.stories.tsx
git commit -m "feat(stories): intake molecule stories part 2 (GenesisSubstepRail, SkillBar, StarMap, SubRailStep, TraitCard)"
```

---

## Task 14: Molecule landing stories

**Files:**
- Create: `src/app/_ui/molecules/landing/AuthForm.stories.tsx`
- Create: `src/app/_ui/molecules/landing/AuthTabs.stories.tsx`
- Create: `src/app/_ui/molecules/landing/Brand.stories.tsx`
- Create: `src/app/_ui/molecules/landing/ConsoleBox.stories.tsx`
- Create: `src/app/_ui/molecules/landing/FeedHeader.stories.tsx`
- Create: `src/app/_ui/molecules/landing/HeroBackground.stories.tsx`
- Create: `src/app/_ui/molecules/landing/HeroContent.stories.tsx`
- Create: `src/app/_ui/molecules/landing/Stats.stories.tsx`
- Create: `src/app/_ui/molecules/landing/StatusIndicator.stories.tsx`

- [ ] **Step 1: Create Brand stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Brand from './Brand';

const meta: Meta<typeof Brand> = {
  title: 'Molecules/Landing/Brand',
  component: Brand,
};
export default meta;
type Story = StoryObj<typeof Brand>;

export const Default: Story = {};
```

- [ ] **Step 2: Create AuthTabs stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AuthTabs from './AuthTabs';

const meta: Meta<typeof AuthTabs> = {
  title: 'Molecules/Landing/AuthTabs',
  component: AuthTabs,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof AuthTabs>;

const TABS = [['login', 'LOGIN'], ['register', 'REGISTER']] as const;

export const LoginActive: Story = {
  render: () => {
    const [active, setActive] = useState('login');
    return <AuthTabs activeTab={active} tabs={TABS} onTabChange={setActive} />;
  },
};

export const RegisterActive: Story = {
  render: () => {
    const [active, setActive] = useState('register');
    return <AuthTabs activeTab={active} tabs={TABS} onTabChange={setActive} />;
  },
};
```

- [ ] **Step 3: Create AuthForm stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AuthForm from './AuthForm';

const meta: Meta<typeof AuthForm> = {
  title: 'Molecules/Landing/AuthForm',
  component: AuthForm,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof AuthForm>;

const FACTIONS = ['Voidborn Compact', 'Iron Doctrine', 'Mirrorhand Guild'];

export const LoginIdle: Story = {
  render: () => {
    const [handle, setHandle] = useState('');
    const [pw, setPw] = useState('');
    return (
      <AuthForm
        mode="login"
        phase="idle"
        handle={handle}
        password={pw}
        faction=""
        factions={FACTIONS}
        message=""
        onHandleChange={setHandle}
        onPasswordChange={setPw}
        onFactionChange={() => {}}
        onSubmit={(e) => e.preventDefault()}
      />
    );
  },
};

export const LoginWorking: Story = {
  render: () => (
    <AuthForm
      mode="login"
      phase="working"
      handle="void_runner"
      password="••••••••"
      faction=""
      factions={FACTIONS}
      message="authenticating pilot…"
      onHandleChange={() => {}}
      onPasswordChange={() => {}}
      onFactionChange={() => {}}
      onSubmit={(e) => e.preventDefault()}
    />
  ),
};

export const LoginDenied: Story = {
  render: () => (
    <AuthForm
      mode="login"
      phase="denied"
      handle="void_runner"
      password="wrong"
      faction=""
      factions={FACTIONS}
      message="access denied — credentials rejected"
      onHandleChange={() => {}}
      onPasswordChange={() => {}}
      onFactionChange={() => {}}
      onSubmit={(e) => e.preventDefault()}
    />
  ),
};

export const RegisterIdle: Story = {
  render: () => {
    const [handle, setHandle] = useState('');
    const [faction, setFaction] = useState(FACTIONS[0]);
    return (
      <AuthForm
        mode="register"
        phase="idle"
        handle={handle}
        password=""
        faction={faction}
        factions={FACTIONS}
        message=""
        onHandleChange={setHandle}
        onPasswordChange={() => {}}
        onFactionChange={setFaction}
        onSubmit={(e) => e.preventDefault()}
      />
    );
  },
};
```

- [ ] **Step 4: Create ConsoleBox stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import ConsoleBox from './ConsoleBox';

const meta: Meta<typeof ConsoleBox> = {
  title: 'Molecules/Landing/ConsoleBox',
  component: ConsoleBox,
};
export default meta;
type Story = StoryObj<typeof ConsoleBox>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ color: 'var(--bs-ink)', fontFamily: 'var(--bs-mono)', fontSize: 12 }}>
        Console content goes here
      </div>
    ),
  },
};
```

- [ ] **Step 5: Create Stats stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Stats from './Stats';

const meta: Meta<typeof Stats> = {
  title: 'Molecules/Landing/Stats',
  component: Stats,
};
export default meta;
type Story = StoryObj<typeof Stats>;

export const Default: Story = {
  args: {
    stats: [
      ['PILOTS LOST', '1,204'],
      ['VOIDS CROSSED', '38,901'],
      ['FACTIONS ACTIVE', '6'],
    ] as const,
  },
};
```

- [ ] **Step 6: Create StatusIndicator stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import StatusIndicator from './StatusIndicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Molecules/Landing/StatusIndicator',
  component: StatusIndicator,
};
export default meta;
type Story = StoryObj<typeof StatusIndicator>;

export const Default: Story = { args: { children: 'WORLD FEED' } };
export const WithLiveDot: Story = { args: { children: 'LIVE', live: true } };
```

- [ ] **Step 7: Create FeedHeader stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import FeedHeader from './FeedHeader';

const meta: Meta<typeof FeedHeader> = {
  title: 'Molecules/Landing/FeedHeader',
  component: FeedHeader,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof FeedHeader>;

export const Default: Story = {};
```

- [ ] **Step 8: Create HeroBackground stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import HeroBackground from './HeroBackground';

const meta: Meta<typeof HeroBackground> = {
  title: 'Molecules/Landing/HeroBackground',
  component: HeroBackground,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof HeroBackground>;

// Note: requires /public/intake/eclipse-hero.png — will show gradient scrims over missing image.
export const Default: Story = {};
```

- [ ] **Step 9: Create HeroContent stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import HeroContent from './HeroContent';

const meta: Meta<typeof HeroContent> = {
  title: 'Molecules/Landing/HeroContent',
  component: HeroContent,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof HeroContent>;

const STATS = [
  ['PILOTS LOST', '1,204'],
  ['VOIDS CROSSED', '38,901'],
] as const;

export const Typing: Story = {
  args: {
    eyebrow: 'SECTOR · DEEP REACH',
    tagline: 'The void does not forget. Neither do we.',
    taglineDone: false,
    stats: STATS,
  },
};

export const Done: Story = {
  args: {
    eyebrow: 'SECTOR · DEEP REACH',
    tagline: 'The void does not forget. Neither do we.',
    taglineDone: true,
    stats: STATS,
  },
};
```

- [ ] **Step 10: Commit**

```bash
git add src/app/_ui/molecules/landing/
git commit -m "feat(stories): landing molecule stories (AuthForm, AuthTabs, Brand, ConsoleBox, FeedHeader, HeroBackground, HeroContent, Stats, StatusIndicator)"
```

---

## Task 15: Molecule layout story + final verification

**Files:**
- Create: `src/app/_ui/molecules/layout/NavRow.stories.tsx`

- [ ] **Step 1: Create NavRow stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import NavRow from './NavRow';
import GlowButton from 'ui/atoms/buttons/GlowButton';

const meta: Meta<typeof NavRow> = {
  title: 'Molecules/Layout/NavRow',
  component: NavRow,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof NavRow>;

export const WithBackAndNext: Story = {
  args: {
    onBack: () => {},
    backLabel: '← BACK',
    children: <GlowButton>NEXT →</GlowButton>,
  },
};

export const NoBack: Story = {
  args: {
    children: <GlowButton>BEGIN →</GlowButton>,
  },
};

export const WithLeftExtra: Story = {
  args: {
    onBack: () => {},
    leftExtra: <span style={{ color: 'var(--bs-ink-dim)', fontFamily: 'var(--bs-mono)', fontSize: 11 }}>Step 2 / 4</span>,
    children: <GlowButton>CONTINUE →</GlowButton>,
  },
};
```

- [ ] **Step 2: Final full smoke test**

```bash
pnpm storybook
```

Navigate through the sidebar and verify:
- `Atoms/Buttons/GlowButton` — hover glow visible, Disabled muted
- `Atoms/Display/StrengthMeter` — segments animate with correct colors
- `Atoms/Effects/Starfield` — stars drift
- `Atoms/Text/Wordmark` — large "BLACK SKIES" with amber dot renders in Chakra Petch font
- `Molecules/Intake/FactionCard` — both accent variants render, toggle works
- `Molecules/Intake/StarMap` — nodes clickable, selection highlights
- `Molecules/Landing/AuthForm` — LoginWorking shows spinner cursor, LoginDenied shows error

Stop server.

- [ ] **Step 3: Verify static build**

```bash
pnpm build-storybook
ls storybook-static/index.html
```

Expected: exits 0, `storybook-static/index.html` exists.

- [ ] **Step 4: Final commit**

```bash
git add src/app/_ui/molecules/layout/
git commit -m "feat(stories): NavRow molecule story + verified static build"
```

---

## Verification Checklist

- [ ] `pnpm storybook` opens at `localhost:6006` with dark bg and all CSS vars active
- [ ] Custom fonts (Chakra Petch display, JetBrains Mono) render in Wordmark, Eyebrow, Field
- [ ] No TS errors: `pnpm tsc --noEmit` passes
- [ ] `pnpm build-storybook` exits 0
- [ ] A11y addon shows no critical violations on GlowButton or AuthForm stories
