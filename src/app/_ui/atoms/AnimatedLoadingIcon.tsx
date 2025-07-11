'use client';

import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  100%{transform: rotate(1turn)}
`;

const AnimatedLoadingIcon = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 200px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-right-color: #25b09b;
  margin-bottom: 20px;
  animation: ${rotate} 2s linear infinite;

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    margin: 2px;
    border: inherit;
    border-radius: 50%;
    animation: ${rotate} 2s infinite;
  }

  &::after {
    margin: 8px;
    animation-duration: 3s;
  }
`;

export default AnimatedLoadingIcon;
