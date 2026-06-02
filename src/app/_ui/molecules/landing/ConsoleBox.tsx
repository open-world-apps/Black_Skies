import { ReactNode } from 'react';
import styled from 'styled-components';
import CornerFrame from 'ui/atoms/layout/CornerFrame';

const Wrap = styled.div`
  justify-self: end;
  width: 360px;

  @media (max-width: 860px) {
    justify-self: start;
    margin-top: 36px;
  }
`;

const Console = styled.div`
  background: rgba(8, 10, 16, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--bs-line);
  padding: 30px;
`;

interface ConsoleBoxProps {
  /** Console content */
  children: ReactNode;
  /** Optional className for external styling */
  className?: string;
}

/**
 * ConsoleBox molecule — glassmorphic console container with corner frame
 */
const ConsoleBox = ({ children, className }: ConsoleBoxProps) => (
  <Wrap className={className}>
    <CornerFrame color="var(--bs-line)" len={16}>
      <Console>{children}</Console>
    </CornerFrame>
  </Wrap>
);

export default ConsoleBox;
