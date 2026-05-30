import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  font-size: 11px;
  letter-spacing: 0.4em;
  color: var(--bs-accent);
  margin-bottom: 22px;
`;

interface EyebrowProps {
  /** Eyebrow text content */
  children: ReactNode;
  /** Optional className for external styling */
  className?: string;
}

/**
 * Eyebrow atom — small category label displayed above main heading
 */
const Eyebrow: FC<EyebrowProps> = ({ children, className }) => (
  <Root className={className}>{children}</Root>
);

export default Eyebrow;
