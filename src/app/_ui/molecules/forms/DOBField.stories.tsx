import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DOBField from './DOBField';
import type { DOB, DobResult } from '@/lib/intake/types';

const meta: Meta<typeof DOBField> = {
  title: 'Molecules/Forms/DOBField',
  component: DOBField,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof DOBField>;

export const Empty: Story = {
  render: () => {
    const [dob, setDob] = useState<DOB>({ d: '', m: '', y: '' });
    return <DOBField value={dob} onChange={setDob} result={{ err: null, age: null }} />;
  },
};

export const Valid: Story = {
  render: () => {
    const [dob, setDob] = useState<DOB>({ d: '15', m: '06', y: '1990' });
    return (
      <DOBField value={dob} onChange={setDob} result={{ err: null, age: 35 }} touched />
    );
  },
};

export const Error: Story = {
  render: () => {
    const [dob, setDob] = useState<DOB>({ d: '01', m: '01', y: '2015' });
    return (
      <DOBField
        value={dob}
        onChange={setDob}
        result={{ err: 'must be 18+ to enter the void', age: null, blocked: true }}
        touched
      />
    );
  },
};
