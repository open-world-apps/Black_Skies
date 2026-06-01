import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import HeroBackground from './HeroBackground';

const meta: Meta<typeof HeroBackground> = {
  title: 'Molecules/Landing/HeroBackground',
  component: HeroBackground,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof HeroBackground>;

// Note: requires /public/intake/eclipse-hero.png — gradient scrims still render without image
export const Default: Story = {};
