import type { Meta, StoryObj } from '@storybook/react';
import StepHead from './StepHead';

const meta: Meta<typeof StepHead> = {
  title: 'Molecules/Intake/StepHead',
  component: StepHead,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof StepHead>;

export const WithIndex: Story = {
  args: {
    index: '01', total: 4, kicker: 'CLEARANCE PROTOCOL', title: 'Verify Identity',
    blurb: 'The void does not forget. Confirm who you are before proceeding.',
  },
};

export const NoIndex: Story = {
  args: {
    kicker: 'GENESIS · ARCHETYPE', title: 'Choose Your Cast',
    blurb: 'Your archetype defines your inherited strengths and the skills you carry into the dark.',
  },
};

export const NoBlurb: Story = {
  args: { index: '02', kicker: 'COMMISSION', title: 'Commission' },
};
