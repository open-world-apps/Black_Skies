'use client';

import styled from 'styled-components';
import { Fallback } from '@radix-ui/react-avatar';

const AvatarFallback = styled(Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: white;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
`;

export default AvatarFallback;
