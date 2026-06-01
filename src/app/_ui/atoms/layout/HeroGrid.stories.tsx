import type { Meta, StoryObj } from '@storybook/react';
import HeroGrid from './HeroGrid';

const meta: Meta<typeof HeroGrid> = {
  title: 'Atoms/Layout/HeroGrid',
  component: HeroGrid,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#05060a' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof HeroGrid>;

export const Default: Story = {
  args: {
    children: (
      <>
        <div style={{ color: 'var(--bs-ink)', fontFamily: 'var(--bs-mono)', fontSize: 12 }}>LEFT COLUMN</div>
        <div style={{ color: 'var(--bs-accent)', fontFamily: 'var(--bs-mono)', fontSize: 12 }}>RIGHT COLUMN</div>
      </>
    ),
  },
};
