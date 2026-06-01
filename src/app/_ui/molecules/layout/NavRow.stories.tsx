import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import NavRow from './NavRow';
import GlowButton from 'ui/atoms/buttons/GlowButton';

const meta: Meta<typeof NavRow> = {
  title: 'Molecules/Layout/NavRow',
  component: NavRow,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: '100%' }}><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof NavRow>;

export const WithBackAndNext: Story = {
  args: {
    onBack: () => {},
    backLabel: '← BACK',
    children: <GlowButton>NEXT →</GlowButton>,
  },
};

export const NoBack: Story = {
  args: {
    children: <GlowButton>BEGIN →</GlowButton>,
  },
};

export const WithLeftExtra: Story = {
  args: {
    onBack: () => {},
    leftExtra: (
      <span style={{ color: 'var(--bs-ink-dim)', fontFamily: 'var(--bs-mono)', fontSize: 11 }}>
        Step 2 / 4
      </span>
    ),
    children: <GlowButton>CONTINUE →</GlowButton>,
  },
};
