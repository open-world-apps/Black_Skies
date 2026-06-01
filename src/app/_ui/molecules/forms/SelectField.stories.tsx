import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SelectField from './SelectField';

const meta: Meta<typeof SelectField> = {
  title: 'Molecules/Forms/SelectField',
  component: SelectField,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof SelectField>;

const OPTIONS = ['Mercenary', 'Trader', 'Explorer', 'Bounty Hunter'];

export const Empty: Story = {
  render: () => {
    const [v, setV] = useState('');
    return <SelectField label="ARCHETYPE" value={v} onChange={setV} options={OPTIONS} />;
  },
};

export const Selected: Story = {
  render: () => {
    const [v, setV] = useState('Explorer');
    return <SelectField label="ARCHETYPE" value={v} onChange={setV} options={OPTIONS} touched />;
  },
};

export const WithError: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <SelectField
        label="ARCHETYPE"
        value={v}
        onChange={setV}
        options={OPTIONS}
        error="selection required"
        touched
      />
    );
  },
};
