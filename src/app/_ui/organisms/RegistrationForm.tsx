'use client';

import React, { FC, ReactElement, useState, useEffect } from 'react';
import FormRoot from '../atoms/generic/forms/FormRoot';
import Field from '../atoms/generic/forms/Field';
import FlexContainer from '../atoms/generic/FlexContainer';
import { Label } from '@radix-ui/react-form';
import Message from '../atoms/generic/forms/Message';
import { Form } from 'radix-ui';
import Input from '../atoms/generic/forms/Input';

const RegistrationForm: FC = (): ReactElement => {
  return (
    <FormRoot>
      <Field name="username">
        <FlexContainer alignItems="baseline" justifyContent="space-between">
          <Label>Username</Label>
          <Message match="valueMissing">Please enter an email.</Message>
          <Message match="tooShort">Username not long enough.</Message>
          <Message match="tooLong">Username too long.</Message>
        </FlexContainer>
        <Form.Control asChild>
          <Input type="text" minLength={12} maxLength={25} required />
        </Form.Control>
      </Field>
      <Field name="email">
        <FlexContainer>
          <Label>Email</Label>
          <Message match="typeMismatch">Please provide a valid email.</Message>
        </FlexContainer>
      </Field>
    </FormRoot>
  );
};

export default RegistrationForm;
