import type { Meta, StoryObj } from '@storybook/react';
import Glyph from './Glyph';
import type { GlyphType } from '@/lib/intake/types';

const meta: Meta<typeof Glyph> = {
  title: 'Atoms/Icons/Glyph',
  component: Glyph,
  argTypes: {
    type: {
      control: 'select',
      options: ['ring', 'dot', 'diamond', 'chevron', 'cross', 'bars', 'node', 'arrow'] satisfies GlyphType[],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Glyph>;

export const Ring: Story = { args: { type: 'ring', size: 24, c: 'var(--bs-accent)' } };
export const Dot: Story = { args: { type: 'dot', size: 24, c: 'var(--bs-accent2)' } };
export const Diamond: Story = { args: { type: 'diamond', size: 24, c: '#fff' } };
export const Chevron: Story = { args: { type: 'chevron', size: 24, c: 'var(--bs-ink-dim)' } };
export const Cross: Story = { args: { type: 'cross', size: 24, c: '#d8533f' } };
export const Bars: Story = { args: { type: 'bars', size: 24, c: 'var(--bs-accent2)' } };
export const Node: Story = { args: { type: 'node', size: 24, c: 'var(--bs-accent)' } };
export const Arrow: Story = { args: { type: 'arrow', size: 24, c: '#fff' } };
