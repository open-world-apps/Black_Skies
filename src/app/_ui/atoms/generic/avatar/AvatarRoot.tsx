'use client';

import styled from 'styled-components';
import { Root } from '@radix-ui/react-avatar';

const AvatarRoot = styled(Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: black;
  margin: 3px 50px 0 0;

  hover: {
    cursor: pointer;
  }
`

export default AvatarRoot;
