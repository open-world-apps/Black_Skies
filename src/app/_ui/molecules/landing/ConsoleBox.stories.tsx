import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ConsoleBox from './ConsoleBox';

const meta: Meta<typeof ConsoleBox> = {
  title: 'Molecules/Landing/ConsoleBox',
  component: ConsoleBox,
};
export default meta;

type Story = StoryObj<typeof ConsoleBox>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ color: 'var(--bs-ink)', fontFamily: 'var(--bs-mono)', fontSize: 12 }}>
        Console content goes here
      </div>
    ),
  },
};
