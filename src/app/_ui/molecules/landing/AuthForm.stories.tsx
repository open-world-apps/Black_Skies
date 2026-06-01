import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import AuthForm from './AuthForm';

const meta: Meta<typeof AuthForm> = {
  title: 'Molecules/Landing/AuthForm',
  component: AuthForm,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof AuthForm>;

const FACTIONS = ['Voidborn Compact', 'Iron Doctrine', 'Mirrorhand Guild'];

export const LoginIdle: Story = {
  render: () => {
    const [handle, setHandle] = useState('');
    const [pw, setPw] = useState('');
    return (
      <AuthForm
        mode="login"
        phase="idle"
        handle={handle}
        password={pw}
        faction=""
        factions={FACTIONS}
        message=""
        onHandleChange={setHandle}
        onPasswordChange={setPw}
        onFactionChange={() => {}}
        onSubmit={(e) => e.preventDefault()}
      />
    );
  },
};

export const LoginWorking: Story = {
  render: () => (
    <AuthForm
      mode="login"
      phase="working"
      handle="void_runner"
      password="••••••••"
      faction=""
      factions={FACTIONS}
      message="authenticating pilot…"
      onHandleChange={() => {}}
      onPasswordChange={() => {}}
      onFactionChange={() => {}}
      onSubmit={(e) => e.preventDefault()}
    />
  ),
};

export const LoginDenied: Story = {
  render: () => (
    <AuthForm
      mode="login"
      phase="denied"
      handle="void_runner"
      password="wrong"
      faction=""
      factions={FACTIONS}
      message="access denied — credentials rejected"
      onHandleChange={() => {}}
      onPasswordChange={() => {}}
      onFactionChange={() => {}}
      onSubmit={(e) => e.preventDefault()}
    />
  ),
};

export const RegisterIdle: Story = {
  render: () => {
    const [handle, setHandle] = useState('');
    const [faction, setFaction] = useState(FACTIONS[0]);
    return (
      <AuthForm
        mode="register"
        phase="idle"
        handle={handle}
        password=""
        faction={faction}
        factions={FACTIONS}
        message=""
        onHandleChange={setHandle}
        onPasswordChange={() => {}}
        onFactionChange={setFaction}
        onSubmit={(e) => e.preventDefault()}
      />
    );
  },
};
