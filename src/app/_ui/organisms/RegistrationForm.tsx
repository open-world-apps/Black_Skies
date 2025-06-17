'use client';

import React, { FC, ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import Field from '../atoms/generic/forms/Field';
import FlexContainer from '../atoms/generic/FlexContainer';
import Input from '../atoms/generic/forms/Input';
import Label from '../atoms/generic/forms/Label';
import Button from '../atoms/generic/forms/Button';

import schema from '@/lib/utils/formSchema';
import Form from '../atoms/generic/forms/Form';
import Error from '../atoms/generic/forms/Error';

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
    resolver: yupResolver(schema),
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
      url: '/auth/register',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: formData,
    });

    if (res.data.success) {
      router.push('/');
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
          <Field name="Email">
            <Label htmlFor="email">Email</Label>
            <Input
              autoComplete="email"
              id="email"
              type="email"
              {...register('email')}
            />
            {errors.email && <Error>{errors.email?.message}</Error>}
          </Field>
          <FlexContainer gap="20px">
            <Field name="Password">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                {...register('password')}
              />
              {errors.password && <Error>{errors.password?.message}</Error>}
            </Field>
            <Field name="ConfirmPassword">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                {...register('confirmPassword', {
                  validate: val => {
                    if (passwordWatch && passwordWatch.valueOf() !== val) {
                      return 'Password should match';
                    }
                    return true;
                  },
                })}
              />
              {errors.confirmPassword && (
                <Error>{errors.confirmPassword?.message}</Error>
              )}
            </Field>
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
