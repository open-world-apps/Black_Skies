'use client';

import React, { FC, ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Error from 'ui/atoms/generic/forms/Error';
import Field from 'ui/atoms/generic/forms/Field';
import Form from 'ui/atoms/generic/forms/Form';
import Label from 'ui/atoms/generic/forms/Label';
import FlexContainer from 'ui/atoms/generic/FlexContainer';
import Button from 'ui/atoms/generic/forms/Button';
import Input from 'ui/atoms/generic/forms/Input';

import signInSchema from '@/lib/schemas/yup/signInSchema';

type FormInput = {
  username: string;
  password: string;
};

const LoginForm: FC = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(signInSchema),
    mode: 'onChange',
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (_, e) => {
    e?.preventDefault();

    const formData = new FormData(e?.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (res?.error) console.log('You have failed me for the last time.');
    else if (res?.ok) {
      router.push('/');
    }
  });
  return (
    <FlexContainer
      border="1px solid gray"
      borderRadius="25px"
      padding="35px"
      boxShadow="2px 2px 5px black"
      width="20%"
    >
      <section style={{ width: '100%' }}>
        <Form onSubmit={onSubmit}>
          <Field name="Username">
            <Label htmlFor="username">Username</Label>
            <Input
              autoComplete="username"
              id="username"
              type="text"
              {...register('username')}
            />
            {errors.username && <Error>{errors.username?.message}</Error>}
          </Field>
          <Field name="password">
            <Label htmlFor="password">Password</Label>
            <Input
              autoComplete="current-password"
              id="password"
              type="password"
              {...register('password')}
            />
            {errors.password && <Error>{errors.password?.message}</Error>}
          </Field>
          <FlexContainer justifyContent="center">
            <Button
              style={{
                marginTop: 10,
                width: '150px',
                height: '25px',
                color: 'white',
              }}
              type="submit"
            >
              Login
            </Button>
          </FlexContainer>
        </Form>
      </section>
    </FlexContainer>
  );
};

export default LoginForm;
