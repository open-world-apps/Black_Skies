import type { Meta, StoryObj } from '@storybook/react';
import Starfield from './Starfield';

const meta: Meta<typeof Starfield> = {
  title: 'Atoms/Effects/Starfield',
  component: Starfield,
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 600, height: 300, background: '#05060a' }}>
        <Story />
      </div>
    ),
  ],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Starfield>;

export const Default: Story = {};
export const Dense: Story = { args: { count: 320, twinkle: true } };
export const SlowDrift: Story = { args: { count: 80, drift: 0.005 } };
export const NoTwinkle: Story = { args: { twinkle: false } };
