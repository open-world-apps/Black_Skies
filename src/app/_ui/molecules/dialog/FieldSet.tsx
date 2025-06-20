import React, { FC, ReactElement } from 'react';
import Label from 'ui/atoms/generic/dialog/Label';
import Input from 'ui/atoms/generic/Input';
import { FieldSet as FSet } from 'ui/primitives/dialog/FieldSet';

type FieldSetProps = {
  label: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  type?: React.HTMLInputTypeAttribute;
  variant?: 'flex1';
  defaultValue?: string;
} & React.ComponentProps<typeof FSet>;

const FieldSet: FC<FieldSetProps> = ({
  label,
  defaultValue,
  autoComplete,
  variant,
  type,
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
        required
      />
    </FSet>
  );
};

export default FieldSet;
