import React, { FC, ReactElement } from 'react';
import FlexContainer from '../atoms/generic/FlexContainer';
import NavLinks from '../molecules/NavLinks';

/**
 * FlexContainer
 *  NavLinks
 *  Char Stats (loggedIn) | hidden
 *    Health, Money, Energy, Adrenaline (loggedIn)
 *  SearchField
 *  ProfileBubble
 * /FlexContainer
 */

const Header: FC = (): ReactElement => {
  // const [loggedIn, setLoggedIn] = useState(false);

  return (
    <FlexContainer height="50px" width="100vw">
      <NavLinks />
    </FlexContainer>
  );
};

export default Header;
