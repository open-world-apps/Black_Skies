import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Root = styled.div``;

const Value = styled.div`
  font-family: var(--bs-display);
  font-size: 26px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`;

const Label = styled.div`
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--bs-ink-dim);
  margin-top: 4px;
`;

interface StatProps {
  /** Stat value to display */
  value: ReactNode;
  /** Stat label */
  label: string;
  /** Optional className for external styling */
  className?: string;
}

/**
 * Stat atom — displays a single statistic with value and label
 */
const Stat: FC<StatProps> = ({ value, label, className }) => (
  <Root className={className}>
    <Value>{value}</Value>
    <Label>{label}</Label>
  </Root>
);

export default Stat;
