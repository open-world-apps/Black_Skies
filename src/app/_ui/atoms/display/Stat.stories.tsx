import type { Meta, StoryObj } from '@storybook/react';
import Stat from './Stat';

const meta: Meta<typeof Stat> = { title: 'Atoms/Display/Stat', component: Stat };
export default meta;

type Story = StoryObj<typeof Stat>;

export const Default: Story = { args: { value: '1,204', label: 'PILOTS LOST' } };
export const WithReactNode: Story = { args: { value: '∞', label: 'VOIDS CROSSED' } };
