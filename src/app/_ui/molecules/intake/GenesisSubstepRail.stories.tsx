import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import GenesisSubstepRail from './GenesisSubstepRail';

const meta: Meta<typeof GenesisSubstepRail> = {
  title: 'Molecules/Intake/GenesisSubstepRail',
  component: GenesisSubstepRail,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 260 }}><Story /></div>],
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
