'use client';

import { } from 'react';
import styled from 'styled-components';

import { scoreKey } from '@/lib/intake/validators';

interface StrengthMeterProps {
  pw: string;
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 2px;
`;

const Segments = styled.div`
  display: flex;
  gap: 4px;
`;

const Segment = styled.div<{ $on: boolean; $col: string }>`
  flex: 1;
  height: 3px;
  background: ${({ $on, $col }) => ($on ? $col : 'rgba(255, 255, 255, 0.08)')};
  box-shadow: ${({ $on, $col }) => ($on ? `0 0 6px ${$col}` : 'none')};
  transition: all 0.25s;
`;

const Caption = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: var(--bs-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--bs-ink-dim);
`;

const StrengthMeter = ({ pw }: StrengthMeterProps) => {
  const { score, label } = scoreKey(pw);
  const col =
    score <= 0
      ? '#d8533f'
      : score === 1
        ? '#e8932f'
        : score === 2
          ? '#e8c23f'
          : 'var(--bs-accent2)';

  return (
    <Wrap>
      <Segments>
        {[0, 1, 2, 3, 4].map(i => (
          <Segment key={i} $on={i <= score && !!pw} $col={col} />
        ))}
      </Segments>
      <Caption>
        <span>ENCRYPTION INTEGRITY</span>
        <span style={{ color: pw ? col : 'var(--bs-ink-dim)' }}>
          {pw ? label : '—'}
        </span>
      </Caption>
    </Wrap>
  );
};

export default StrengthMeter;
