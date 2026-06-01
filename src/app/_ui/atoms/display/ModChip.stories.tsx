import type { Meta, StoryObj } from '@storybook/react';
import ModChip from './ModChip';

const meta: Meta<typeof ModChip> = { title: 'Atoms/Display/ModChip', component: ModChip };
export default meta;

type Story = StoryObj<typeof ModChip>;

export const Positive: Story = { args: { label: 'PILOTING', v: 3 } };
export const Negative: Story = { args: { label: 'SOCIAL', v: -2 } };
