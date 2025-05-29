import React, { FC, ReactElement } from 'react';
import FlexContainer from './_ui/atoms/generic/FlexContainer';
import Container from './_ui/atoms/generic/Container';
import Title from './_ui/atoms/generic/Title';
import RTButton from './_ui/atoms/generic/RTButton';

const Home: FC = (): ReactElement => {
  return (
    <>
      <main>
        <FlexContainer height="100vh" $column>
          <FlexContainer height="100vh" $row>
            <Container width="45%" height="100vh" />
            <FlexContainer
              $alignItems="center"
              $justifyContent="center"
              $column
            >
              <Title color="white" $fontSize="8rem">
                Black&nbsp;Skies
              </Title>
              <FlexContainer $colGap="10px" height="fit-content" $row>
                <RTButton width="150px">Play&nbsp;Now&nbsp;-&gt;</RTButton>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </main>
    </>
  );
};

export default Home;
