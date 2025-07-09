import React, { FC, ReactElement } from 'react';
import FlexContainer from '../atoms/FlexContainer';
import NavLinks from '../molecules/NavLinks';
import Container from '../atoms/Container';
import CharStats from '../molecules/CharStats';
import DropDown from './Dropdown';

const Header: FC = (): ReactElement => {
  // const [loggedIn, setLoggedIn] = useState(false);

  return (
    <FlexContainer
      $background="#292626"
      $height="50px"
      $width="100%"
      $alignItems="center"
      $justifyContent="flex-end"
      $colGap="20px"
      $position="fixed"
      $top="0"
    >
      <CharStats />
      <NavLinks />
      <Container $height="40px" $width="40px" $margin="0 50px 0 0">
        <DropDown />
      </Container>
    </FlexContainer>
  );
};

export default Header;
