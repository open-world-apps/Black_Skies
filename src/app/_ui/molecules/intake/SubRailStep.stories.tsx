import type { Meta, StoryObj } from '@storybook/react';
import SubRailStep from './SubRailStep';

const meta: Meta<typeof SubRailStep> = {
  title: 'Molecules/Intake/SubRailStep',
  component: SubRailStep,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 260 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof SubRailStep>;

export const Done: Story = { args: { label: 'ARCHETYPE', status: 'done', onClick: () => {} } };
export const Active: Story = { args: { label: 'DOSSIER', status: 'active' } };
export const Upcoming: Story = { args: { label: 'SKILL FORGE', status: 'upcoming' } };
