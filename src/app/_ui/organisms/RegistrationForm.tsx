'use client';

import React, { FC, ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import FlexContainer from 'ui/primitives/FlexContainer';
import Button from 'ui/atoms/generic/forms/Button';
import Form from 'ui/primitives/form/Form';
import Field from 'ui/molecules/form/Field';

import userRegSchema from '@/lib/schemas/yup/userRegSchema';

type FormInput = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
};

export const RegistrationForm: FC = (): ReactElement => {
  const {
    register,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(userRegSchema),
    mode: 'onChange',
  });

  const router = useRouter();
  const passwordWatch = watch('password');

  useEffect(() => {
    trigger('confirmPassword');
  }, [passwordWatch, trigger]);

  const onSubmit = handleSubmit(async (_, e) => {
    const formData = new FormData(e?.target);

    const res = await axios({
      method: 'post',
      url: '/profile/create',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: formData,
    });

    if (res.data.success) {
      router.push('/auth/login');
    }
  });

  return (
    <FlexContainer
      border="1px solid gray"
      borderRadius="25px"
      padding="35px"
      boxShadow="2px 2px 5px black"
      width="40%"
    >
      <section style={{ width: '100%' }}>
        <Form onSubmit={onSubmit}>
          <Field
            name="Username"
            label="Username"
            autoComplete="username"
            type="text"
            register={register('username')}
            errors={errors.username}
          />
          <Field
            name="Email"
            label="Email"
            autoComplete="email"
            type="text"
            register={register('email')}
            errors={errors.email}
          />
          <FlexContainer gap="20px">
            <Field
              name="Password"
              label="Password"
              autoComplete="new-password"
              type="password"
              register={register('password')}
              errors={errors.password}
            />
            <Field
              name="ConfirmPassword"
              label="Confirm password"
              autoComplete="off"
              type="password"
              register={register('confirmPassword', {
                validate: val => {
                  if (passwordWatch && passwordWatch.valueOf() !== val) {
                    return 'Password should match';
                  }
                  return true;
                },
              })}
              errors={errors.confirmPassword}
            />
          </FlexContainer>
          <FlexContainer justifyContent="center">
            <Button
              style={{
                marginTop: 10,
                width: '150px',
                height: '25px',
              }}
              type="submit"
            >
              Register
            </Button>
          </FlexContainer>
        </Form>
      </section>
    </FlexContainer>
  );
};

export default RegistrationForm;
