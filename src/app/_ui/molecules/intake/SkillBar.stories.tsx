import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import SkillBar from './SkillBar';
import type { SkillRow } from '@/lib/intake/types';

const meta: Meta<typeof SkillBar> = {
  title: 'Molecules/Intake/SkillBar',
  component: SkillBar,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof SkillBar>;

const SKILL: SkillRow = { key: 'piloting', label: 'PILOTING', cat: 'flight', base: 5, aMod: 3, bBonus: 1, total: 9 };
const HIGH: SkillRow = { ...SKILL, key: 'combat', label: 'COMBAT', total: 13 };

export const Default: Story = {
  render: () => {
    const [reveal, setReveal] = useState(false);
    useEffect(() => { setTimeout(() => setReveal(true), 50); }, []);
    return <SkillBar sk={SKILL} idx={0} reveal={reveal} />;
  },
};

export const High: Story = {
  render: () => {
    const [reveal, setReveal] = useState(false);
    useEffect(() => { setTimeout(() => setReveal(true), 50); }, []);
    return <SkillBar sk={HIGH} idx={0} reveal={reveal} />;
  },
};
