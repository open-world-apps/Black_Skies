'use client';

import React, { FC, ReactElement } from 'react';

import { useRouter } from 'next/navigation';
import Item from 'ui/atoms/dropdown/Item';

import { useAppDispatch } from '@/lib/state/app/hooks';
import { openDlg } from '@/lib/state/reducers/menus/dialogSlice';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

interface LoggedOutProps {
  closeMenu: ActionCreatorWithoutPayload<'menu/close'>;
}

const LoggedOut: FC<LoggedOutProps> = ({ closeMenu }): ReactElement => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <>
      <Item
        onSelect={e => {
          e.preventDefault();
          dispatch(openDlg());
          dispatch(closeMenu());
        }}
      >
        Login
      </Item>
      <Item
        onSelect={e => {
          e.preventDefault();
          dispatch(closeMenu());
          router.push('/auth/register');
        }}
      >
        Register
      </Item>
    </>
  );
};

export default LoggedOut;
