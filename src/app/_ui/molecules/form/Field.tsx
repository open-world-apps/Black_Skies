import React, { ComponentProps, FC, ReactElement } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import Error from 'ui/atoms/generic/forms/Error';
import Input from 'ui/atoms/generic/Input';
import Label from 'ui/atoms/generic/forms/Label';
import StyledField from 'ui/primitives/form/StyledField';

type FieldProps = {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  inputStyle?: string;
  errors?: FieldError;
  register: UseFormRegisterReturn<string>;
} & ComponentProps<typeof StyledField>;

const Field: FC<FieldProps> = ({
  label,
  type,
  autoComplete,
  inputStyle,
  register,
  errors,
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
        {...register}
      />
      {errors && <Error>{errors?.message}</Error>}
    </StyledField>
  );
};

export default Field;
