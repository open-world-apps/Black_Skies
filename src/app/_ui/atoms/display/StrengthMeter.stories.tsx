import type { Meta, StoryObj } from '@storybook/react';
import StrengthMeter from './StrengthMeter';

const meta: Meta<typeof StrengthMeter> = { title: 'Atoms/Display/StrengthMeter', component: StrengthMeter };
export default meta;

type Story = StoryObj<typeof StrengthMeter>;

export const Empty: Story = { args: { pw: '' } };
export const Weak: Story = { args: { pw: 'abc' } };
export const Adequate: Story = { args: { pw: 'Abc12345' } };
export const Ironclad: Story = { args: { pw: 'V0id!Bl@ck$k135' } };
