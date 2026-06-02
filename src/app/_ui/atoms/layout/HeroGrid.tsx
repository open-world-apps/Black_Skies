import { ReactNode } from 'react';
import styled from 'styled-components';

/**
 * Two-column hero layout grid.
 * Positions hero content on the left and console/CTA on the right with space-between alignment.
 */

interface HeroGridProps {
  children: ReactNode;
}

const Grid = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 56px;
  z-index: 10;
`;

const HeroGrid = ({ children }: HeroGridProps) => {
  return <Grid>{children}</Grid>;
};

export default HeroGrid;
