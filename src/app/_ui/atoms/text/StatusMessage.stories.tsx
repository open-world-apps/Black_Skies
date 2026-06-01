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
