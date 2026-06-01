import type { Meta, StoryObj } from '@storybook/react';
import Scanlines from './Scanlines';

const meta: Meta<typeof Scanlines> = {
  title: 'Atoms/Effects/Scanlines',
  component: Scanlines,
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 300, height: 200, background: '#1a2030' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Scanlines>;

export const Default: Story = {};
export const HalfStrength: Story = { args: { factor: 0.5 } };
export const FullStrength: Story = { args: { factor: 2 } };
