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
