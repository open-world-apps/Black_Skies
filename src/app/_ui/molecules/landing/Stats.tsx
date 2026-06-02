import { } from 'react';
import styled from 'styled-components';
import Stat from 'ui/atoms/display/Stat';

const Root = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 44px;
`;

interface StatsProps {
  /** Array of stat data [label, value] */
  stats: Array<readonly [string, string]>;
  /** Optional className for external styling */
  className?: string;
}

/**
 * Stats molecule — grid of stat displays
 */
const Stats = ({ stats, className }: StatsProps) => (
  <Root className={className}>
    {stats.map(([label, value]) => (
      <Stat key={label} value={value} label={label} />
    ))}
  </Root>
);

export default Stats;
