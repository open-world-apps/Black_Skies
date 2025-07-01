'use client';

import React, { FC, ReactElement } from 'react';

import Button from 'ui/atoms/generic/dialog/Button';
import Content from 'ui/atoms/generic/dialog/Content';
import Description from 'ui/atoms/generic/dialog/Description';
import Overlay from 'ui/atoms/generic/dialog/Overlay';
import Title from 'ui/atoms/generic/dialog/Title';
import FlexContainer from 'ui/atoms/generic/FlexContainer';
import OAuthLogin from 'ui/molecules/dialog/OAuthLogin';

import { closeDlg } from '@/lib/state/reducers/menus/dialogSlice';
import { Close, Portal } from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useAppDispatch } from '@/lib/state/app/hooks';
import Credentials from '../Credentials';

const Login: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <Portal>
      <Overlay />
      <Content>
        <FlexContainer justifyContent="center" alignItems="center" column>
          <Title>Login</Title>
          <Description>Signin with</Description>
          <OAuthLogin />
          <br />
          or
          <br /><br /><br />
          <Credentials />
        </FlexContainer>
        <Close onClick={() => dispatch(closeDlg())} asChild>
          <Button className="icon" aria-label="close">
            <Cross2Icon />
          </Button>
        </Close>
      </Content>
    </Portal>
  );
};

export default Login;
