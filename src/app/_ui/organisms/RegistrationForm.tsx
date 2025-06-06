'use client';

import React, { FC, ReactElement, useState } from 'react';
import FormRoot from '../atoms/generic/forms/FormRoot';
import Field from '../atoms/generic/forms/Field';
import FlexContainer from '../atoms/generic/FlexContainer';
import Message from '../atoms/generic/forms/Message';
import Input from '../atoms/generic/forms/Input';
import Button from '../atoms/generic/forms/Button';
import Container from '../atoms/generic/Container';
import Label from '../atoms/generic/forms/Label';
import { Control, Submit } from '@radix-ui/react-form';

export const RegistrationForm: FC = (): ReactElement => {
  const [passwordValue, setPasswordValue] = useState<string>();

  return (
    <FlexContainer
      border="1px solid gray"
      borderRadius="25px"
      padding="35px"
      boxShadow="2px 2px 5px black"
    >
      <FormRoot>
        <Field name="username">
          <FlexContainer alignItems="baseline" justifyContent="space-between">
            <Label>Username</Label>
            <Message match="valueMissing">Please enter an email.</Message>
            <Message match="tooShort">Username not long enough.</Message>
            <Message match="tooLong">Username too long.</Message>
          </FlexContainer>
          <Control asChild>
            <Input type="text" minLength={12} maxLength={25} required />
          </Control>
        </Field>
        <Field name="email">
          <FlexContainer alignItems="baseline" justifyContent="space-between">
            <Label>Email</Label>
            <Message match="typeMismatch">
              Please provide a valid email.
            </Message>
          </FlexContainer>
          <Control asChild>
            <Input type="email" required />
          </Control>
        </Field>
        <FlexContainer gap="20px">
          <Field name="password">
            <FlexContainer alignItems="baseline" justifyContent="space-between">
              <Label>Password</Label>
              <Message match="valueMissing">Please enter a password</Message>
            </FlexContainer>
            <Control asChild>
              <Input type="password" autoComplete="new-password" required />
            </Control>
          </Field>
          <Field name="confirmPwd">
            <FlexContainer alignItems="baseline" justifyContent="space-between">
              <Label>Confirm Password</Label>
              <Message match="valueMissing">Please confirm password.</Message>
              <Message match={value => value !== passwordValue}>
                Passwords do not match.
              </Message>
            </FlexContainer>
            <Control asChild>
              <Input
                type="password"
                defaultValue=""
                autoComplete="new-password"
                onChange={value => setPasswordValue(value.target.textContent!)}
                required
              />
            </Control>
          </Field>
        </FlexContainer>
        <Container justifySelf="center">
          <Submit asChild>
            <Button
              style={{
                marginTop: 10,
                width: '150px',
                height: '25px',
              }}
            >
              Register
            </Button>
          </Submit>
        </Container>
      </FormRoot>
    </FlexContainer>
  );
};

export default RegistrationForm;
