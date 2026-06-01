import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CheckRow from './CheckRow';

const meta: Meta<typeof CheckRow> = {
  title: 'Molecules/Forms/CheckRow',
  component: CheckRow,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof CheckRow>;

export const Unchecked: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <CheckRow checked={checked} onChange={setChecked}>
        I accept the terms and conditions of the void
      </CheckRow>
    );
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <CheckRow checked={checked} onChange={setChecked}>
        I accept the terms and conditions of the void
      </CheckRow>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <CheckRow checked={checked} onChange={setChecked} error="you must agree to enter the void" touched>
        I accept the terms and conditions of the void
      </CheckRow>
    );
  },
};
