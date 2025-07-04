'use client';

import React, { FC, ReactElement } from 'react';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Button from 'ui/atoms/generic/dialog/Button';
import FlexContainer from 'ui/atoms/generic/FlexContainer';

import signInSchema from '@/lib/schemas/yup/signInSchema';
import { useAppDispatch } from '@/lib/state/app/hooks';
import { closeDlg } from '@/lib/state/reducers/menus/dialogSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { Close } from '@radix-ui/react-dialog';

import FieldSet from './dialog/FieldSet';

type FormInput = {
  username: string;
  password: string;
};

const Credentials: FC = (): ReactElement => {
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
    if (res?.ok) dispatch(closeDlg());
  });

  return (
    <>
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
          autoComplete="off"
          type="password"
          action={onEnter}
          errors={errors.password}
        />
      </form>
      <FlexContainer $justifyContent="flex-end">
        <Close asChild>
          <Button className="green" onClick={submitForm}>
            Login
          </Button>
        </Close>
      </FlexContainer>
    </>)
};

export default Credentials;
