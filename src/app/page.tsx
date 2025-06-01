import React, { FC, ReactElement } from 'react';
import FlexContainer from '@/app/_ui/atoms/generic/FlexContainer';
import Container from '@/app/_ui/atoms/generic/Container';
import Title from '@/app/_ui/atoms/generic/Title';
import RTButton from '@/app/_ui/atoms/generic/RTButton';

const Home: FC = (): ReactElement => {
  return (
    <>
      <main>
        <FlexContainer height="100vh" $column>
          <FlexContainer
            height="100%"
            $justifyContent="center"
            $alignItems="center"
            $row
          >
            <Container width="36%" height="100%" />
            <FlexContainer
              $alignItems="center"
              $justifyContent="center"
              height="100%"
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
