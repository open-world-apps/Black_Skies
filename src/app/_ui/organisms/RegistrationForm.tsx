'use client';

import React, { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import FlexContainer from 'ui/atoms/FlexContainer';
import Button from 'ui/atoms/forms/Button';
import Form from 'ui/atoms/forms/Form';
import Field from 'ui/molecules/form/Field';
import PasswordField from 'ui/molecules/form/PasswordField';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldInputs } from '@/lib/types/types';
import fieldSchema from '@/lib/schemas/yup/userRegSchema';

export const RegistrationForm: FC = (): ReactElement => {
  const {
    register,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FieldInputs>({
    resolver: yupResolver(fieldSchema),
    mode: 'onChange',
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (_, e) => {
    const formData = new FormData(e?.target);

    const res = await axios({
      method: 'post',
      url: '/profile/create',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: formData,
    });

    if (res.data.success) {
      router.push('/');
    }
  });

  return (
    <FlexContainer
      $position="fixed"
      $height="100vh"
      $width="100vw"
      $background="rgba(44, 42, 42, 0.9)"
      $justifyContent="center"
      $alignItems="center"
    >
      <FlexContainer
        $border="1px solid gray"
        $borderRadius="25px"
        $padding="35px"
        $background="rgb(44, 42, 42)"
        $boxShadow="2px 2px 5px black"
        $width="40%"
      >
        <section style={{ width: '100%' }}>
          <Form onSubmit={onSubmit}>
            <Field
              name="Username"
              label="Username"
              autoComplete="username"
              type="text"
              register={register}
              errors={errors}
              registerType="username"
            />
            <Field
              name="Email"
              label="Email"
              autoComplete="email"
              type="text"
              register={register}
              errors={errors}
              registerType="email"
            />
            <FlexContainer $gap="20px">
              <PasswordField
                name="Password"
                label="Password"
                autoComplete="new-password"
                type="password"
                register={register}
                watchFn={watch}
                triggerFn={trigger}
                errors={errors}
                clearErrors={clearErrors}
              />
              <PasswordField
                name="ConfirmPassword"
                label="Confirm password"
                autoComplete="off"
                type="password"
                register={register}
                watchFn={watch}
                triggerFn={trigger}
                errors={errors}
                clearErrors={clearErrors}
                confirmPwd
              />
            </FlexContainer>
            <FlexContainer $justifyContent="center">
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
    </FlexContainer>
  );
};

export default RegistrationForm;
