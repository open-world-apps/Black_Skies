import type { Meta, StoryObj } from '@storybook/react';
import Cursor from './Cursor';

const meta: Meta<typeof Cursor> = { title: 'Atoms/Effects/Cursor', component: Cursor };
export default meta;

type Story = StoryObj<typeof Cursor>;

export const Visible: Story = { args: { visible: true } };
export const Hidden: Story = { args: { visible: false } };
