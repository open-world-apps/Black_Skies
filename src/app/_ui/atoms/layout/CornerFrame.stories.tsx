import type { Meta, StoryObj } from '@storybook/react';
import CornerFrame from './CornerFrame';

const meta: Meta<typeof CornerFrame> = {
  title: 'Atoms/Layout/CornerFrame',
  component: CornerFrame,
};
export default meta;
type Story = StoryObj<typeof CornerFrame>;

export const Default: Story = {
  args: {
    children: <div style={{ padding: 24, color: 'var(--bs-ink)' }}>Content inside frame</div>,
  },
};

export const AccentColor: Story = {
  args: {
    color: 'var(--bs-accent)',
    len: 20,
    children: <div style={{ padding: 24, color: 'var(--bs-ink)' }}>Amber corners</div>,
  },
};

export const Teal: Story = {
  args: {
    color: 'var(--bs-accent2)',
    len: 10,
    children: <div style={{ padding: 24, color: 'var(--bs-ink)' }}>Teal corners</div>,
  },
};
