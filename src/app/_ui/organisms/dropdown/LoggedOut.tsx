'use client';

import { useAppDispatch } from '@/lib/state/app/hooks';
import { open } from '@/lib/state/reducers/menus/dialogSlice';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import React, { FC, ReactElement } from 'react';
import Item from 'ui/atoms/generic/dropdown/Item';

interface LoggedOutProps {
  closeMenu: ActionCreatorWithoutPayload<'menu/close'>;
}

const LoggedOut: FC<LoggedOutProps> = ({ closeMenu }): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Item
        onSelect={e => {
          e.preventDefault();
          dispatch(open());
          dispatch(closeMenu());
        }}
      >
        Login
      </Item>
      <Item
        onSelect={e => {
          e.preventDefault();
          dispatch(open());
          dispatch(closeMenu());
        }}
      >
        Register
      </Item>
    </>
  );
};

export default LoggedOut;
