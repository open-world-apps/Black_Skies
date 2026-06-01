import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Field from './Field';

const meta: Meta<typeof Field> = {
  title: 'Atoms/Forms/Field',
  component: Field,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => {
    const [v, setV] = useState('');
    return <Field label="HANDLE" value={v} onChange={setV} placeholder="enter callsign" />;
  },
};

export const Password: Story = {
  render: () => {
    const [v, setV] = useState('');
    return <Field label="ACCESS KEY" value={v} onChange={setV} type="password" placeholder="••••••••" />;
  },
};

export const Prefilled: Story = {
  render: () => {
    const [v, setV] = useState('void_runner_7');
    return <Field label="CALLSIGN" value={v} onChange={setV} />;
  },
};
