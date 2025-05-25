import React, { FC, ReactElement } from 'react';
import FlexContainer from './_ui/atoms/FlexContainer';
import Container from './_ui/atoms/Container';
import Header from './_ui/atoms/Header';
import RTButton, { RTInfoButton } from './_ui/atoms/RTButton';

const Home: FC = (): ReactElement => {
  return (
    <>
      <main>
        <FlexContainer height="100vh" $overflowHidden={true}>
          <FlexContainer height="100vh" direction="row">
            <Container width="45%" height="100vh" />
            <FlexContainer
              direction="column"
              $alignItems="center"
              $justifyContent="center"
            >
              <Header color="white" $fontSize="8rem">
                Black&nbsp;Skies
              </Header>
              <FlexContainer
                direction="row"
                $colGap="10px"
                height="fit-content"
              >
                <RTButton width="150px">Play&nbsp;Now&nbsp;-&gt;</RTButton>
                <RTInfoButton width="150px">
                  &#9432;&nbsp;More&nbsp;Info
                </RTInfoButton>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </main>
    </>
  );
};

export default Home;
