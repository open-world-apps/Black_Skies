'use client';

import React, { FC, ReactElement } from 'react';

import { signOut } from 'next-auth/react';
import Item from 'ui/atoms/dropdown/Item';

import { useAppDispatch } from '@/lib/state/app/hooks';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

interface LoggedInProps {
  closeMenu: ActionCreatorWithoutPayload<'menu/close'>;
}

const LoggedIn: FC<LoggedInProps> = ({ closeMenu }): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Item
        onSelect={e => {
          e.preventDefault();
          dispatch(closeMenu());
        }}
      >
        Profile
      </Item>
      <Item
        onSelect={e => {
          e.preventDefault();
          dispatch(closeMenu());
        }}
      >
        Settings
      </Item>
      <Item
        onSelect={e => {
          e.preventDefault();
          dispatch(closeMenu());
          signOut();
        }}
      >
        Logout
      </Item>
      <Item
        onSelect={e => {
          e.preventDefault();
          dispatch(closeMenu());
        }}
      >
        Support
      </Item>
    </>
  );
};

export default LoggedIn;
