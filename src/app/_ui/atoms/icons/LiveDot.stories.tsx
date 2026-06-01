import type { Meta, StoryObj } from '@storybook/react';
import LiveDot from './LiveDot';

const meta: Meta<typeof LiveDot> = { title: 'Atoms/Icons/LiveDot', component: LiveDot };
export default meta;

type Story = StoryObj<typeof LiveDot>;

export const Default: Story = {};
export const Streaming: Story = { args: { status: 'streaming' } };
export const Inactive: Story = { args: { status: 'inactive' } };
