import React, { ComponentProps, FC, ReactElement } from 'react';

import {
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

import Error from 'ui/atoms/generic/forms/Error';
import Input from 'ui/atoms/generic/Input';
import Label from 'ui/atoms/generic/forms/Label';
import StyledField from 'ui/atoms/generic/forms/StyledField';

import { type FieldInputs } from '@/lib/types';

type FieldProps = {
  register: UseFormRegister<FieldInputs>;
  watchFn?: UseFormWatch<FieldInputs>;
  triggerFn?: UseFormTrigger<FieldInputs>;
  errors?: FieldErrors<FieldInputs>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  inputStyle?: string;
  registerType: 'username' | 'email';
} & ComponentProps<typeof StyledField>;

const Field: FC<FieldProps> = ({
  register,
  watchFn,
  triggerFn,
  errors,
  label,
  type,
  autoComplete,
  inputStyle,
  registerType,
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
    <StyledField {...props}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        className={(inputStyle && inputStyle) || 'defaultInput'}
        autoComplete={autoComplete}
        id={id}
        type={type}
        {...register(registerType)}
      />
      {errors && <Error>{errors[registerType]?.message}</Error>}
    </StyledField>
  );
};

export default Field;
