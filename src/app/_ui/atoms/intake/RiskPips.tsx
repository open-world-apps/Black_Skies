'use client';

import { FC } from 'react';
import styled from 'styled-components';

interface RiskPipsProps {
  n: number;
}

const Wrap = styled.span`
  display: inline-flex;
  gap: 2px;
`;

const Pip = styled.span<{ $on: boolean; $n: number }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $on, $n }) =>
    $on
      ? $n >= 4
        ? '#d8533f'
        : $n >= 3
          ? 'var(--bs-accent)'
          : 'var(--bs-accent2)'
      : 'rgba(255, 255, 255, 0.1)'};
`;

const RiskPips: FC<RiskPipsProps> = ({ n }) => (
  <Wrap>
    {[1, 2, 3, 4, 5].map(i => (
      <Pip key={i} $on={i <= n} $n={n} />
    ))}
  </Wrap>
);

export default RiskPips;
