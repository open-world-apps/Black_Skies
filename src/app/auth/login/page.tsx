import React, { FC, ReactElement } from 'react';

import FlexContainer from 'ui/primitives/FlexContainer';
import LoginForm from 'ui/organisms/LoginForm';

const Login: FC = (): ReactElement => {
  return (
    <>
      <main>
        <FlexContainer
          height="100vh"
          justifyContent="center"
          alignItems="center"
          column
        >
          <LoginForm />
        </FlexContainer>
      </main>
    </>
  );
};

export default Login;
