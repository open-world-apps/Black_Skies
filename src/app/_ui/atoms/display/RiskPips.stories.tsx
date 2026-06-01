import type { Meta, StoryObj } from '@storybook/react';
import RiskPips from './RiskPips';

const meta: Meta<typeof RiskPips> = { title: 'Atoms/Display/RiskPips', component: RiskPips };
export default meta;

type Story = StoryObj<typeof RiskPips>;

export const Low: Story = { args: { n: 1 } };
export const Medium: Story = { args: { n: 3 } };
export const High: Story = { args: { n: 4 } };
export const Max: Story = { args: { n: 5 } };
