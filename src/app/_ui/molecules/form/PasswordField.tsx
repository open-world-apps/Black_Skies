'use client';

import React, { ComponentProps, FC, ReactElement, useEffect } from 'react';

import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

import Error from 'ui/atoms/forms/Error';
import Input from 'ui/atoms/Input';
import Label from 'ui/atoms/forms/Label';
import StyledField from 'ui/atoms/forms/StyledField';

import { type FieldInputs } from '@/lib/types/types';

type FieldProps = {
  register: UseFormRegister<FieldInputs>;
  watchFn?: UseFormWatch<FieldInputs>;
  triggerFn?: UseFormTrigger<FieldInputs>;
  errors?: FieldErrors<FieldInputs>;
  clearErrors?: UseFormClearErrors<FieldInputs>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  inputStyle?: string;
  confirmPwd?: boolean;
} & ComponentProps<typeof StyledField>;

const PasswordField: FC<FieldProps> = ({
  register,
  watchFn,
  triggerFn,
  errors,
  clearErrors,
  label,
  type,
  autoComplete,
  inputStyle,
  confirmPwd = false,
  ...props
}): ReactElement => {
  const passwordValue = watchFn && watchFn('password');

  useEffect(() => {
    if (triggerFn && passwordValue) {
      triggerFn('confirmPassword');
    } else if (!passwordValue && clearErrors) {
      clearErrors('password');
      clearErrors('confirmPassword');
    }
  }, [passwordValue]);

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
      {confirmPwd ? (
        <Input
          className={(inputStyle && inputStyle) || 'defaultInput'}
          autoComplete={autoComplete}
          id={id}
          type={type}
          {...register('confirmPassword', {
            validate: val => {
              if (passwordValue && passwordValue.valueOf() !== val) {
                return 'Password must match';
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
          {...register('password')}
        />
      )}
      {!confirmPwd ? (
        <Error>{errors?.password?.message}</Error>
      ) : (
        <Error>{errors?.confirmPassword?.message}</Error>
      )}
    </StyledField>
  );
};

export default PasswordField;
