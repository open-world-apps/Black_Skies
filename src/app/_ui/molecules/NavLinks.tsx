'use client';

import React, { FC, ReactElement } from 'react';
import SLink from '../atoms/generic/SLink';
import FlexContainer from '../atoms/generic/FlexContainer';
import Divider from '../atoms/generic/Divider';

const NavLinks: FC = (): ReactElement => {
  return (
    <FlexContainer
      colGap="10px"
      width="fit-content"
      alignItems="center"
      margin="0 0 0 12%"
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
