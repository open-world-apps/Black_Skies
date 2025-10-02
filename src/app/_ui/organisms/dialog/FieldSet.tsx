import React, { FC, ReactElement } from 'react';

import { FieldError, UseFormRegister } from 'react-hook-form';
import { FieldSet as FSet } from 'ui/atoms/dialog/FieldSet';
import Label from 'ui/atoms/dialog/Label';
import Input from 'ui/atoms/Input';

import { LoginInputs } from '@/lib/types/types';

type FieldSetProps = {
  label: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  type?: React.HTMLInputTypeAttribute;
  variant?: 'flex1';
  defaultValue?: string;
  registerValue: 'username' | 'password';
  errors?: FieldError;
  action?: (e?: React.KeyboardEvent) => void;
  register: UseFormRegister<LoginInputs>;
} & React.ComponentProps<typeof FSet>;

const FieldSet: FC<FieldSetProps> = ({
  label,
  defaultValue,
  autoComplete,
  variant,
  type,
  action,
  register,
  registerValue,
  ...props
}): ReactElement => {
  const id = label
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (m, i) =>
      i === 0 ? m.toLowerCase() : m.toUpperCase()
    )
    .replace(/\s+/g, '');

  return (
    <FSet {...props}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        className={(variant && variant) || 'defaultClass'}
        id={id}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        placeholder={label}
        onKeyDown={action}
        {...register(registerValue)}
        required
      />
    </FSet>
  );
};

export default FieldSet;
