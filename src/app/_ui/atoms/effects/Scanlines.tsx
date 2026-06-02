'use client';

import { } from 'react';
import styled from 'styled-components';

interface ScanlinesProps {
  factor?: number;
}

const Overlay = styled.div<{ $factor: number }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 50;
  opacity: calc(var(--bs-crt, 0.5) * ${({ $factor }) => $factor});
  background-image: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.5) 0px,
    rgba(0, 0, 0, 0.5) 1px,
    transparent 1px,
    transparent 3px
  );
  mix-blend-mode: multiply;
`;

const Scanlines = ({ factor = 1 }: ScanlinesProps) => (
  <Overlay $factor={factor} />
);

export default Scanlines;
