import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ValField from './ValField';

const meta: Meta<typeof ValField> = {
  title: 'Molecules/Forms/ValField',
  component: ValField,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof ValField>;

export const Empty: Story = {
  render: () => {
    const [v, setV] = useState('');
    return <ValField label="CALLSIGN" value={v} onChange={setV} placeholder="3-18 chars" />;
  },
};

export const Valid: Story = {
  render: () => {
    const [v, setV] = useState('void_runner_7');
    return <ValField label="CALLSIGN" value={v} onChange={setV} valid touched />;
  },
};

export const Invalid: Story = {
  render: () => {
    const [v, setV] = useState('x');
    return (
      <ValField
        label="CALLSIGN"
        value={v}
        onChange={setV}
        error="too short — 3 characters minimum"
        touched
      />
    );
  },
};

export const Password: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <ValField
        label="ACCESS KEY"
        value={v}
        onChange={setV}
        type="password"
        placeholder="••••••••"
        hint="MIN 8 CHARS"
      />
    );
  },
};
