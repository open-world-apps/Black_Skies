'use client';

import styled from 'styled-components';
import Container from './Container';

const InnerBubble = styled(Container)`
  background: url('/user.png');
  background-color: gray;
  background-size: 100%;
  border: 1px dotted white;
  border-radius: 50%;
  height: 99%;
  width: 99%;

  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

export default InnerBubble;
