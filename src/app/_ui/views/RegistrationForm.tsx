import React, { FC, ReactElement } from 'react';
import { RegistrationForm as Form } from '../organisms/RegistrationForm';
import FlexContainer from '../primitives/FlexContainer';

const RegistrationForm: FC = (): ReactElement => {
  return (
    <FlexContainer
      position="fixed"
      height="100vh"
      width="100vw"
      background="rgba(44, 42, 42, 0.9)"
      justifyContent="center"
      alignItems="center"
    >
      <Form />
    </FlexContainer>
  );
};

export default RegistrationForm;
