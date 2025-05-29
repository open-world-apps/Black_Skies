'use client';

import styled from 'styled-components';

interface Props {
  $direction: 'right' | 'down' | 'left' | 'up';
}

const Arrow = styled.i<Props>`
  height: 10px;
  width: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
`;

export const AnimatedArrow = styled(Arrow)<Props>`
  transition: transform 0.3s ease;
  transform: ${props =>
    (props.$direction === 'right' && 'rotate(-45deg)') ||
    (props.$direction === 'left' && 'rotate(135deg)') ||
    (props.$direction === 'up' && 'rotate(-135deg)') ||
    (props.$direction === 'down' && 'rotate(45deg)')};
`;

export default Arrow;
