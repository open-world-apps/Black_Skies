import { ReactNode } from 'react';
import styled from 'styled-components';
import LiveDot from 'ui/atoms/icons/LiveDot';

const Root = styled.span``;

interface StatusIndicatorProps {
  /** Status text to display */
  children: ReactNode;
  /** Whether to show live indicator dot */
  live?: boolean;
  /** Optional className for external styling */
  className?: string;
}

/**
 * StatusIndicator molecule — displays status text with optional live indicator
 */
const StatusIndicator = ({
  children,
  live,
  className,
}: StatusIndicatorProps) => (
  <Root className={className}>
    {live && (
      <>
        <LiveDot />
        &nbsp;
      </>
    )}
    {children}
  </Root>
);

export default StatusIndicator;
