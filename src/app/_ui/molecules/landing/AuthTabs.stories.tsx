import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import AuthTabs from './AuthTabs';

const meta: Meta<typeof AuthTabs> = {
  title: 'Molecules/Landing/AuthTabs',
  component: AuthTabs,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof AuthTabs>;

const TABS = [['login', 'LOGIN'], ['register', 'REGISTER']] as const;

export const LoginActive: Story = {
  render: () => {
    const [active, setActive] = useState('login');
    return <AuthTabs activeTab={active} tabs={TABS} onTabChange={setActive} />;
  },
};

export const RegisterActive: Story = {
  render: () => {
    const [active, setActive] = useState('register');
    return <AuthTabs activeTab={active} tabs={TABS} onTabChange={setActive} />;
  },
};
