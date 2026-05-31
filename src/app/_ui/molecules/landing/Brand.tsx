import { FC } from 'react';
import styled from 'styled-components';
import Glyph from 'ui/atoms/icons/Glyph';

const Root = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BrandName = styled.span`
  font-family: var(--bs-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.34em;
`;

interface BrandProps {
  /** Optional className for external styling */
  className?: string;
}

/**
 * Brand molecule — displays logo glyph with brand name
 */
const Brand: FC<BrandProps> = ({ className }) => (
  <Root className={className}>
    <Glyph type="node" size={20} c="var(--bs-accent)" />
    <BrandName>BLACK&nbsp;SKIES</BrandName>
  </Root>
);

export default Brand;
