'use client';

import React, { FC, ReactElement } from 'react';
import { Dialog as D } from 'radix-ui';
import Overlay from 'ui/atoms/generic/dialog/Overlay';
import Content from 'ui/primitives/dialog/Content';
import Title from 'ui/atoms/generic/dialog/Title';
import Description from 'ui/atoms/generic/dialog/Description';
import FieldSet from 'ui/molecules/dialog/FieldSet';
import FlexContainer from 'ui/primitives/FlexContainer';
import Button from 'ui/atoms/generic/dialog/Button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { close } from '@/lib/state/reducers/menus/dialogSlice';
import { useAppDispatch, useAppSelector } from '@/lib/state/app/hooks';

const Dialog: FC = (): ReactElement => {
  const isOpen = useAppSelector(state => state.dialog.open);
  const dispatch = useAppDispatch()

  return (
    <D.Root open={isOpen} onOpenChange={() => dispatch(close())}>
      <D.Portal>
        <Overlay />
        <Content>
          <FlexContainer justifyContent="center" alignItems="center" column>
            <Title>Login</Title>
            <Description>Login to your account here.</Description>
          </FlexContainer>
          <FieldSet label="Username" />
          <FieldSet label="Password" />
          <FlexContainer marginTop={25} justifyContent="flex-end">
            <D.Close asChild>
              <Button className="green">Login</Button>
            </D.Close>
          </FlexContainer>
          <D.Close onClick={() => close()} asChild>
            <Button className="icon" aria-label="close">
              <Cross2Icon />
            </Button>
          </D.Close>
        </Content>
      </D.Portal>
    </D.Root>
  );
};

export default Dialog;
