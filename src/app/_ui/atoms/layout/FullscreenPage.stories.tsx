import type { Meta, StoryObj } from '@storybook/react';
import FullscreenPage from './FullscreenPage';

const meta: Meta<typeof FullscreenPage> = {
  title: 'Atoms/Layout/FullscreenPage',
  component: FullscreenPage,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof FullscreenPage>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: 40, fontFamily: 'var(--bs-mono)', fontSize: 12, color: 'var(--bs-ink-dim)' }}>
        Fullscreen page content
      </div>
    ),
  },
};
