import React, { FC, ReactElement } from 'react';

import Container from 'ui/atoms/Container';
import FlexContainer from 'ui/atoms/FlexContainer';
import RTButton from 'ui/atoms/RTButton';
import Title from 'ui/atoms/Title';
import Dialog from 'ui/molecules/dialog/Dialog';
import Login from 'ui/organisms/dialog/Login';

const Home: FC = (): ReactElement => (
  <>
    <main>
      <Dialog>
        <Login />
      </Dialog>
      <FlexContainer $height="100vh" $column>
        <FlexContainer
          $height="100%"
          $justifyContent="center"
          $alignItems="center"
        >
          <Container $width="36%" $height="100%" />
          <FlexContainer
            $alignItems="center"
            $justifyContent="center"
            $height="100%"
            $column
          >
            <Title>Black&nbsp;Skies</Title>
            <FlexContainer $colGap="10px" $height="fit-content">
              <RTButton>Play&nbsp;Now&nbsp;-&gt;</RTButton>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </main>
  </>
);

export default Home;
