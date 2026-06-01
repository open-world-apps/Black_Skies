import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import StarMap from './StarMap';
import type { SpawnNode } from '@/lib/intake/types';

const meta: Meta<typeof StarMap> = {
  title: 'Molecules/Intake/StarMap',
  component: StarMap,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
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
