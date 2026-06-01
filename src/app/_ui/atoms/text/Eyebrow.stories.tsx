import type { Meta, StoryObj } from '@storybook/react';
import Eyebrow from './Eyebrow';

const meta: Meta<typeof Eyebrow> = {
  title: 'Atoms/Text/Eyebrow',
  component: Eyebrow,
};
export default meta;
type Story = StoryObj<typeof Eyebrow>;

export const Default: Story = { args: { children: 'SECTOR · DEEP REACH' } };
