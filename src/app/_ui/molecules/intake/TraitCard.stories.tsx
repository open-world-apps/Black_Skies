import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TraitCard from './TraitCard';
import type { TraitPair } from '@/lib/intake/types';

const meta: Meta<typeof TraitCard> = {
  title: 'Molecules/Intake/TraitCard',
  component: TraitCard,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof TraitCard>;

const PAIR: TraitPair = {
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
    return <TraitCard pair={PAIR} selected={sel} onToggle={() => setSel(s => !s)} />;
  },
};

export const Selected: Story = {
  render: () => {
    const [sel, setSel] = useState(true);
    return <TraitCard pair={PAIR} selected={sel} onToggle={() => setSel(s => !s)} />;
  },
};

export const Locked: Story = { args: { pair: PAIR, locked: true } };

export const Disabled: Story = {
  render: () => {
    const [sel, setSel] = useState(false);
    return <TraitCard pair={PAIR} disabled={!sel} onToggle={() => setSel(s => !s)} />;
  },
};
