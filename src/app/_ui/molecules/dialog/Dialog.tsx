'use client';

import React, { FC, ReactElement } from 'react';
import { Root } from '@radix-ui/react-dialog';

import { close } from '@/lib/state/reducers/menus/dialogSlice';
import { useAppDispatch, useAppSelector } from '@/lib/state/app/hooks';

interface DialogProps {
  children: React.ReactNode
}

const Dialog: FC<DialogProps> = ({ children }): ReactElement => {
  const isOpen = useAppSelector(state => state.dialog.open);
  const dispatch = useAppDispatch();

  return (
    <Root open={isOpen} onOpenChange={() => dispatch(close())}>
      {children}
    </Root>
  );
};

export default Dialog;
