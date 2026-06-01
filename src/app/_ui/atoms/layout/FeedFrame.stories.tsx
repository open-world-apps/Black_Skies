import type { Meta, StoryObj } from '@storybook/react';
import FeedFrame from './FeedFrame';

const meta: Meta<typeof FeedFrame> = {
  title: 'Atoms/Layout/FeedFrame',
  component: FeedFrame,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof FeedFrame>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: 16, color: 'var(--bs-ink-dim)', fontFamily: 'var(--bs-mono)', fontSize: 12 }}>
        Feed content goes here
      </div>
    ),
  },
};
