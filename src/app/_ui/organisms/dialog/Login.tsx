'use client';

import React, { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Portal, Close } from '@radix-ui/react-dialog';

import FieldSet from './FieldSet';
import Overlay from 'ui/atoms/generic/dialog/Overlay';
import Content from 'ui/atoms/generic/dialog/Content';
import FlexContainer from 'ui/atoms/generic/FlexContainer';
import Title from 'ui/atoms/generic/dialog/Title';
import Description from 'ui/atoms/generic/dialog/Description';
import Button from 'ui/atoms/generic/dialog/Button';

import { useAppDispatch } from '@/lib/state/app/hooks';
import { close } from '@/lib/state/reducers/menus/dialogSlice';
import signInSchema from '@/lib/schemas/yup/signInSchema';

type FormInput = {
  username: string;
  password: string;
};

const Login: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(signInSchema),
    mode: 'onChange',
  });

  const onEnter = (e?: React.KeyboardEvent) => {
    if (e?.key === 'Enter') {
      submitForm();
    }
  };

  const submitForm = handleSubmit(async (data, e) => {
    e?.preventDefault();
    const res = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    if (res?.ok) dispatch(close());
  });

  return (
    <Portal>
      <Overlay />
      <Content>
        <FlexContainer justifyContent="center" alignItems="center" column>
          <Title>Login</Title>
          <Description>Login to your account here.</Description>
        </FlexContainer>
        <form>
          <FieldSet
            label="Username"
            register={register}
            registerValue="username"
            errors={errors.username}
          />
          <FieldSet
            label="Password"
            register={register}
            registerValue="password"
            autoComplete="none"
            type="password"
            action={onEnter}
            errors={errors.password}
          />
        </form>
        <FlexContainer marginTop={25} justifyContent="flex-end">
          <Close asChild>
            <Button className="green" onClick={submitForm}>
              Login
            </Button>
          </Close>
        </FlexContainer>
        <Close onClick={() => close()} asChild>
          <Button className="icon" aria-label="close">
            <Cross2Icon />
          </Button>
        </Close>
      </Content>
    </Portal>
  );
};

export default Login;
