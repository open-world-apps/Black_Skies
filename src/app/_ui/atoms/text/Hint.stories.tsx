import type { Meta, StoryObj } from '@storybook/react';
import Hint from './Hint';

const meta: Meta<typeof Hint> = {
  title: 'Atoms/Text/Hint',
  component: Hint,
};
export default meta;
type Story = StoryObj<typeof Hint>;

export const Idle: Story = {};
export const Error: Story = { args: { error: 'callsign required — the void needs a name' } };
export const Ok: Story = { args: { ok: 'handle available' } };
