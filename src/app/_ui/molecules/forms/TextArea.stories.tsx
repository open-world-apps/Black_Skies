import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TextArea from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Molecules/Forms/TextArea',
  component: TextArea,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof TextArea>;

export const Empty: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <TextArea
        label="BACKSTORY"
        value={v}
        onChange={setV}
        placeholder="describe your history in the void…"
        maxLen={400}
      />
    );
  },
};

export const Prefilled: Story = {
  render: () => {
    const [v, setV] = useState('Born on a derelict transport near the outer belt, I learned to trust no one and read the stars.');
    return (
      <TextArea label="BACKSTORY" value={v} onChange={setV} hint="400 CHAR MAX" maxLen={400} rows={5} />
    );
  },
};
