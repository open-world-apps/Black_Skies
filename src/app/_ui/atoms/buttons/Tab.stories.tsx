import type { Meta, StoryObj } from '@storybook/react';
import Tab from './Tab';

const meta: Meta<typeof Tab> = {
  title: 'Atoms/Buttons/Tab',
  component: Tab,
  args: { onClick: () => {} },
};
export default meta;
type Story = StoryObj<typeof Tab>;

export const Active: Story = {
  args: { children: 'LOGIN', active: true },
};

export const Inactive: Story = {
  args: { children: 'REGISTER', active: false },
};
