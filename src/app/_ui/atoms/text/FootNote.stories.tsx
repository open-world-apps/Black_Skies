import type { Meta, StoryObj } from '@storybook/react';
import FootNote from './FootNote';

const meta: Meta<typeof FootNote> = {
  title: 'Atoms/Text/FootNote',
  component: FootNote,
};
export default meta;
type Story = StoryObj<typeof FootNote>;

export const Default: Story = {
  args: { children: 'no account survives the dark unaided.' },
};
