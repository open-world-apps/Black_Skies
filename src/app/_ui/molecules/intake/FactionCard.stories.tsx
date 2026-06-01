import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FactionCard from './FactionCard';
import type { Faction } from '@/lib/intake/types';

const meta: Meta<typeof FactionCard> = {
  title: 'Molecules/Intake/FactionCard',
  component: FactionCard,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => <div style={{ width: 400 }}><Story /></div>,
  ],
};
export default meta;
type Story = StoryObj<typeof FactionCard>;

const FACTION_A: Faction = {
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

const FACTION_T: Faction = {
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
    return <FactionCard f={FACTION_A} selected={sel} onToggle={() => setSel(s => !s)} />;
  },
};

export const AmberSelected: Story = {
  render: () => {
    const [sel, setSel] = useState(true);
    return <FactionCard f={FACTION_A} selected={sel} onToggle={() => setSel(s => !s)} />;
  },
};

export const TealUnselected: Story = {
  render: () => {
    const [sel, setSel] = useState(false);
    return <FactionCard f={FACTION_T} selected={sel} onToggle={() => setSel(s => !s)} />;
  },
};
