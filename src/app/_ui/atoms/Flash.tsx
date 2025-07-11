'use client';

import styled, { keyframes } from 'styled-components';

const flash = keyframes`
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

const Flash = styled.span`
  z-index: 1;
  position: relative;
  color: white;
  font-size: 1em;
  animation: ${flash} 1.5s infinite;
`;

export default Flash;
