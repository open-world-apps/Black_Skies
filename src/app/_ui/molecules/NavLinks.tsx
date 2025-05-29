'use client';

import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import SLink from '../atoms/SLink';
import FlexContainer from '../atoms/generic/FlexContainer';

const Divider = styled.hr`
  margin: 0;
  height: 1rem;
`;

const NavLinks: FC = (): ReactElement => {
  return (
    <FlexContainer
      $colGap="10px"
      width="100vw"
      $alignItems="center"
      $margin="0 0 0 30%"
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
