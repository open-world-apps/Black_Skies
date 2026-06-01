import type { Meta, StoryObj } from '@storybook/react';
import FeedHeaderContainer from './FeedHeaderContainer';

const meta: Meta<typeof FeedHeaderContainer> = {
  title: 'Atoms/Layout/FeedHeaderContainer',
  component: FeedHeaderContainer,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof FeedHeaderContainer>;

export const Default: Story = {
  args: {
    children: (
      <>
        <span style={{ color: 'var(--bs-ink)', fontFamily: 'var(--bs-mono)', fontSize: 11 }}>LEFT</span>
        <span style={{ color: 'var(--bs-accent)', fontFamily: 'var(--bs-mono)', fontSize: 11 }}>RIGHT</span>
      </>
    ),
  },
};
