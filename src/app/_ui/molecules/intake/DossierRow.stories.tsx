import type { Meta, StoryObj } from '@storybook/react';
import DossierRow from './DossierRow';

const meta: Meta<typeof DossierRow> = {
  title: 'Molecules/Intake/DossierRow',
  component: DossierRow,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => <div style={{ width: 380 }}><Story /></div>,
  ],
};
export default meta;
type Story = StoryObj<typeof DossierRow>;

export const Default: Story = { args: { label: 'CALLSIGN', value: 'void_runner_7' } };
export const WithAccent: Story = { args: { label: 'ARCHETYPE', value: 'VOID-BORN', accent: 'var(--bs-accent)' } };
export const DisplayFont: Story = { args: { label: 'LOCATION', value: 'Sagittarius Reach', mono: false } };
