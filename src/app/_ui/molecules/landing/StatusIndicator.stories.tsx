import type { Meta, StoryObj } from '@storybook/react';
import StatusIndicator from './StatusIndicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Molecules/Landing/StatusIndicator',
  component: StatusIndicator,
};
export default meta;

type Story = StoryObj<typeof StatusIndicator>;

export const Default: Story = {
  args: { children: 'WORLD FEED' },
};

export const WithLiveDot: Story = {
  args: { children: 'LIVE', live: true },
};
