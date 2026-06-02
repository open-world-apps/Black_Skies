import { } from 'react';
import styled from 'styled-components';
import Brand from 'ui/molecules/landing/Brand';
import FeedHeader from 'ui/organisms/landing/FeedHeader';
import StatusIndicator from 'ui/molecules/landing/StatusIndicator';

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 30px 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

const StatusGroup = styled.div`
  display: flex;
  gap: 28px;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--bs-ink-dim);
`;

interface TopBarProps {
  /** Number of online users */
  online: string;
  /** Node identifier */
  node: string;
  /** Build version */
  build: string;
  /** Optional className for external styling */
  className?: string;
}

/**
 * TopBar molecule — navigation bar with brand and status indicators
 */
const TopBar = ({ online, node, build, className }: TopBarProps) => (
  <Root className={className}>
    <Brand />
    <StatusGroup>
      <StatusIndicator live>{online} ONLINE</StatusIndicator>
      <StatusIndicator>{node}</StatusIndicator>
      <StatusIndicator>{build}</StatusIndicator>
    </StatusGroup>
  </Root>
);

export default TopBar;
