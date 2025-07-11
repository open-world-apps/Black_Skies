'use client';

import styled from 'styled-components';
import { keyframes } from 'styled-components';

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Strobe = styled.span`
  z-index: 1;
  position: relative;
  font-size: 1.2em;
  color: white;

  &.dot {
    opacity: 0;
    animation: ${blink} 1.5s infinite;
  }

  &.dot.one {
    animation-delay: 0.1s;
  }

  &.dot.two {
    animation-delay: 0.2s;
  }

  &.dot.three {
    animation-delay: 0.3s;
  }
`;

export default Strobe;
