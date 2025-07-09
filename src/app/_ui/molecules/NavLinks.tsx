'use client';

import React, { FC, ReactElement } from 'react';
import SLink from '../atoms/SLink';
import FlexContainer from '../atoms/FlexContainer';
import Divider from '../atoms/Divider';

const NavLinks: FC = (): ReactElement => {
  return (
    <FlexContainer
      $colGap="10px"
      $width="fit-content"
      $alignItems="center"
      $margin="0 0 0 12%"
    >
      <SLink href="/userguides">User Guides</SLink>
      <Divider />
      <SLink href="/community">Community</SLink>
      <Divider />
      <SLink href="/support">Help</SLink>
    </FlexContainer>
  );
};

export default NavLinks;
