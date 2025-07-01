'use client';

import { useAppDispatch } from '@/lib/state/app/hooks';
import { openDlg } from '@/lib/state/reducers/menus/dialogSlice';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import React, { FC, ReactElement } from 'react';
import Item from 'ui/atoms/generic/dropdown/Item';

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
