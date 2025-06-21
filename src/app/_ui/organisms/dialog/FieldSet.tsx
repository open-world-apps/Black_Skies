import { LoginInputs } from '@/lib/types';
import React, {
  FC,
  ReactElement,
} from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import Label from 'ui/atoms/generic/dialog/Label';
import Input from 'ui/atoms/generic/Input';
import { FieldSet as FSet } from 'ui/atoms/generic/dialog/FieldSet';

type FieldSetProps = {
  label: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  type?: React.HTMLInputTypeAttribute;
  variant?: 'flex1';
  defaultValue?: string;
  registerValue: 'username' | 'password';
  errors?: FieldError;
  register: UseFormRegister<LoginInputs>;
  setState: React.Dispatch<React.SetStateAction<string>>;
} & React.ComponentProps<typeof FSet>;

const FieldSet: FC<FieldSetProps> = ({
  label,
  defaultValue,
  autoComplete,
  variant,
  type,
  setState,
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
        {...register(registerValue, {
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setState(e.target.value);
          },
        })}
        required
      />
    </FSet>
  );
};

export default FieldSet;
