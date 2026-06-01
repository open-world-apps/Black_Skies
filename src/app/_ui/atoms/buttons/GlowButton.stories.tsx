import type { Meta, StoryObj } from '@storybook/react';
import GlowButton from './GlowButton';

const meta: Meta<typeof GlowButton> = {
  title: 'Atoms/Buttons/GlowButton',
  component: GlowButton,
};
export default meta;
type Story = StoryObj<typeof GlowButton>;

export const Default: Story = {
  args: { children: 'ENGAGE' },
};

export const Teal: Story = {
  args: { children: 'CONFIRM', kind: 't' },
};

export const Wide: Story = {
  args: { children: 'ENTER THE VOID', wide: true },
};

export const Disabled: Story = {
  args: { children: 'OFFLINE', disabled: true },
};
