import type { Meta, StoryObj } from '@storybook/react';
import RailStep from './RailStep';

const meta: Meta<typeof RailStep> = {
  title: 'Molecules/Intake/RailStep',
  component: RailStep,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => <div style={{ width: 260 }}><Story /></div>,
  ],
};
export default meta;
type Story = StoryObj<typeof RailStep>;

export const Done: Story = { args: { index: '01', label: 'CLEARANCE', sub: 'identity and age verification', status: 'done' } };
export const Active: Story = { args: { index: '02', label: 'COMMISSION', sub: 'pilot class and starting skills', status: 'active' } };
export const Upcoming: Story = { args: { index: '03', label: 'IDENTITY', sub: 'callsign and vital stats', status: 'upcoming' } };
export const Locked: Story = { args: { index: '04', label: 'GENESIS', sub: 'full pilot creation', status: 'locked', last: true } };
