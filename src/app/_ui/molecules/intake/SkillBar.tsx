'use client';

import { FC } from 'react';
import styled from 'styled-components';

import { SkillRow } from '@/lib/intake/types';

interface SkillBarProps {
  sk: SkillRow;
  idx: number;
  reveal: boolean;
}

const Row = styled.div<{ $reveal: boolean; $idx: number }>`
  display: grid;
  grid-template-columns: 92px 1fr 26px;
  gap: 10px;
  align-items: center;
  padding: 7px 0;
  border-bottom: 1px solid var(--bs-line);
  opacity: ${({ $reveal }) => ($reveal ? 1 : 0)};
  transform: ${({ $reveal }) => ($reveal ? 'translateY(0)' : 'translateY(4px)')};
  transition:
    opacity 0.35s ease ${({ $idx }) => $idx * 35}ms,
    transform 0.35s ease ${({ $idx }) => $idx * 35}ms;
`;

const Name = styled.span`
  font-family: var(--bs-mono);
  font-size: 10.5px;
  letter-spacing: 0.16em;
  color: var(--bs-ink-dim);
`;

const Track = styled.div`
  position: relative;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
`;

const Fill = styled.div<{ $pct: number; $col: string; $idx: number }>`
  position: absolute;
  inset: 0;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $col }) => $col};
  box-shadow: 0 0 8px ${({ $col }) => $col};
  transition: width 0.8s ease;
  transition-delay: ${({ $idx }) => $idx * 40}ms;
`;

const Tick = styled.span`
  position: absolute;
  top: -2px;
  bottom: -2px;
  width: 1px;
  background: rgba(255, 255, 255, 0.12);
`;

const Total = styled.span<{ $col: string }>`
  font-family: var(--bs-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: ${({ $col }) => $col};
  font-weight: 700;
  text-align: right;
`;

const SkillBar: FC<SkillBarProps> = ({ sk, idx, reveal }) => {
  const col =
    sk.total >= 12 ? 'var(--bs-accent2)' : sk.total >= 9 ? 'var(--bs-accent)' : 'var(--bs-ink)';
  const pct = (sk.total / 15) * 100;
  return (
    <Row $reveal={reveal} $idx={idx}>
      <Name>{sk.label}</Name>
      <Track>
        <Fill $pct={pct} $col={col} $idx={idx} />
        {[5, 10].map(t => (
          <Tick key={t} style={{ left: `${(t / 15) * 100}%` }} />
        ))}
      </Track>
      <Total $col={col}>{sk.total}</Total>
    </Row>
  );
};

export default SkillBar;
