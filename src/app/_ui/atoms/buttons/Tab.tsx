import { ReactNode } from 'react';
import styled from 'styled-components';

const Button = styled.button<{ $active: boolean }>`
  flex: 1;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0 12px;
  border-bottom: 2px solid
    ${({ $active }) => ($active ? 'var(--bs-accent)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--bs-ink)' : 'var(--bs-ink-dim)')};
  font-family: var(--bs-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  transition: all 0.2s;
`;

interface TabProps {
  /** Whether this tab is active */
  active: boolean;
  /** Tab label */
  children: ReactNode;
  /** Click handler */
  onClick: () => void;
  /** Optional className for external styling */
  className?: string;
}

/**
 * Tab atom — single tab button with active state
 */
const Tab = ({ active, children, onClick, className }: TabProps) => (
  <Button
    type="button"
    $active={active}
    onClick={onClick}
    className={className}
  >
    {children}
  </Button>
);

export default Tab;
