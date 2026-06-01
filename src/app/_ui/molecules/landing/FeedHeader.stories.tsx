import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import FeedHeader from './FeedHeader';

const meta: Meta<typeof FeedHeader> = {
  title: 'Molecules/Landing/FeedHeader',
  component: FeedHeader,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: '100%' }}><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof FeedHeader>;

export const Default: Story = {};
