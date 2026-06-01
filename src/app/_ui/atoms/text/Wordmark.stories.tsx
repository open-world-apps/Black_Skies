import type { Meta, StoryObj } from '@storybook/react';
import Wordmark from './Wordmark';

const meta: Meta<typeof Wordmark> = {
  title: 'Atoms/Text/Wordmark',
  component: Wordmark,
};
export default meta;
type Story = StoryObj<typeof Wordmark>;

export const Default: Story = {};
