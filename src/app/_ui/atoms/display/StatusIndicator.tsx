import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Root = styled.span``;

const Live = styled.span`
  color: var(--bs-accent2);
`;

interface StatusIndicatorProps {
  /** Status text to display */
  children: ReactNode;
  /** Whether to show live indicator dot */
  live?: boolean;
  /** Optional className for external styling */
  className?: string;
}

/**
 * StatusIndicator atom — displays status text with optional live indicator
 */
const StatusIndicator: FC<StatusIndicatorProps> = ({
  children,
  live,
  className,
}) => (
  <Root className={className}>
    {live && (
      <>
        <Live>●</Live>&nbsp;
      </>
    )}
    {children}
  </Root>
);

export default StatusIndicator;
