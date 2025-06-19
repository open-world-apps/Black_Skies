'use client';

import React, { FC, ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Form from 'ui/primitives/form/Form';
import FlexContainer from 'ui/primitives/FlexContainer';
import Button from 'ui/atoms/generic/forms/Button';

import signInSchema from '@/lib/schemas/yup/signInSchema';
import Field from 'ui/molecules/form/Field';

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
          <Field
            name="Username"
            label="username"
            autoComplete="username"
            type="text"
            register={register('username')}
            errors={errors.username}
          />
          <Field
            name="Password"
            label="password"
            autoComplete="password"
            type="password"
            register={register('password')}
            errors={errors.password}
          />
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
