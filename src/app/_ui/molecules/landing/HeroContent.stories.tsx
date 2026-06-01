import type { Meta, StoryObj } from '@storybook/react';
import HeroContent from './HeroContent';

const meta: Meta<typeof HeroContent> = {
  title: 'Molecules/Landing/HeroContent',
  component: HeroContent,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof HeroContent>;

const STATS = [
  ['PILOTS LOST', '1,204'],
  ['VOIDS CROSSED', '38,901'],
] as const;

export const Typing: Story = {
  args: {
    eyebrow: 'SECTOR · DEEP REACH',
    tagline: 'The void does not forget. Neither do we.',
    taglineDone: false,
    stats: STATS,
  },
};

export const Done: Story = {
  args: {
    eyebrow: 'SECTOR · DEEP REACH',
    tagline: 'The void does not forget. Neither do we.',
    taglineDone: true,
    stats: STATS,
  },
};
