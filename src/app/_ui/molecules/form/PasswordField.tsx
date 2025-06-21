'use client';

import React, { ComponentProps, FC, ReactElement, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Error from 'ui/atoms/generic/forms/Error';
import Input from 'ui/atoms/generic/Input';
import Label from 'ui/atoms/generic/forms/Label';
import StyledField from 'ui/atoms/generic/forms/StyledField';

import { type PasswordFieldInputs } from '@/lib/types';
import { passwordFieldSchema } from '@/lib/schemas/yup/userRegSchema';

type FieldProps = {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  inputStyle?: string;
  registerType: 'password' | 'confirmPassword';
} & ComponentProps<typeof StyledField>;

const PasswordField: FC<FieldProps> = ({
  label,
  type,
  autoComplete,
  inputStyle,
  registerType,
  ...props
}): ReactElement => {
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useForm<PasswordFieldInputs>({
    resolver: yupResolver(passwordFieldSchema),
    mode: 'onChange',
  });

  const passwordValue = watch('password');

  useEffect(() => {
    trigger('confirmPassword');
  }, [passwordValue, trigger]);

  const id = label
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (m, i) =>
      i === 0 ? m.toLowerCase() : m.toUpperCase()
    )
    .replace(/\s+/g, '');

  return (
    <StyledField {...props}>
      <Label htmlFor={id}>{label}</Label>
      {registerType === 'confirmPassword' ? (
        <Input
          className={(inputStyle && inputStyle) || 'defaultInput'}
          autoComplete={autoComplete}
          id={id}
          type={type}
          {...register(registerType, {
            validate: val => {
              if (passwordValue && passwordValue.valueOf() !== val) {
                return 'Password should match';
              }
              return true;
            },
          })}
        />
      ) : (
        <Input
          className={(inputStyle && inputStyle) || 'defaultInput'}
          autoComplete={autoComplete}
          id={id}
          type={type}
          {...register(registerType)}
        />
      )}
      {errors && <Error>{errors[registerType]?.message}</Error>}
    </StyledField>
  );
};

export default PasswordField;
