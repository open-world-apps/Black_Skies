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
