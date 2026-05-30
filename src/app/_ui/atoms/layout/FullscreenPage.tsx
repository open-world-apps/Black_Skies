import { FC, ReactNode } from 'react';
import styled from 'styled-components';

/**
 * Fullscreen page container with fixed positioning and base styles.
 * Fills entire viewport with dark background and monospace font.
 */

interface FullscreenPageProps {
  children: ReactNode;
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
  background: #05060a;
  overflow: hidden;
  font-family: var(--bs-mono);
  color: var(--bs-ink);
`;

const FullscreenPage: FC<FullscreenPageProps> = ({ children }) => {
  return <Root>{children}</Root>;
};

export default FullscreenPage;
