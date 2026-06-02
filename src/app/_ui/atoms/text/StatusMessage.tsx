import { ReactNode } from 'react';
import styled from 'styled-components';

const Accent = styled.div`
  font-size: 11px;
  color: var(--bs-accent);
  letter-spacing: 0.04em;
`;

const Working = styled.div`
  font-size: 11px;
  color: var(--bs-accent2);
  letter-spacing: 0.04em;
`;

type StatusType = 'error' | 'working';

interface StatusMessageProps {
  /** Message type (error or working) */
  type: StatusType;
  /** Message content */
  children: ReactNode;
  /** Whether to show animated cursor */
  showCursor?: boolean;
  /** Optional className for external styling */
  className?: string;
}

/**
 * StatusMessage atom — displays error or working status messages
 */
const StatusMessage = ({
  type,
  children,
  showCursor,
  className,
}: StatusMessageProps) => {
  if (type === 'working') {
    return (
      <Working className={className}>
        {children}
        {showCursor && <span className="bs-blink">_</span>}
      </Working>
    );
  }

  return <Accent className={className}>{children}</Accent>;
};

export default StatusMessage;
