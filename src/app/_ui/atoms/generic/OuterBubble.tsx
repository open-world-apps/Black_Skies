'use client';

import styled from 'styled-components';
import Container from './Container';

const OuterBubble = styled(Container)`
  background: white;
  border: 1px solid white;
  border-radius: 50%;
  height: 100%;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

export default OuterBubble;
