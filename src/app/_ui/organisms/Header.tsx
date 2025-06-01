import React, { FC, ReactElement } from 'react';
import FlexContainer from '../atoms/generic/FlexContainer';
import NavLinks from '../molecules/NavLinks';
import Container from '../atoms/generic/Container';
import Bubble from '../molecules/Bubble';
import CharStats from '../molecules/CharStats';

const Header: FC = (): ReactElement => {
  // const [loggedIn, setLoggedIn] = useState(false);

  return (
    <FlexContainer
      $background="#292626"
      height="50px"
      width="100%"
      $alignItems="center"
      $justifyContent="flex-end"
      $colGap="20px"
      $position="fixed"
      $top="0"
      $zIndex={1000}
    >
      <CharStats />
      <NavLinks />
      <Container width="40px" height="40px" $margin="0 50px 0 0">
        <Bubble />
      </Container>
    </FlexContainer>
  );
};

export default Header;
