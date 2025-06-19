import React, { FC, ReactElement } from 'react';

import FlexContainer from 'ui/primitives/FlexContainer';
import RegistrationForm from 'ui/organisms/RegistrationForm';

const Register: FC = (): ReactElement => {
  return (
    <>
      <main>
        <FlexContainer
          height="100vh"
          justifyContent="center"
          alignItems="center"
          column
        >
          <RegistrationForm />
        </FlexContainer>
      </main>
    </>
  );
};

export default Register;
