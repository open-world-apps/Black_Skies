'use client';

import { FC } from 'react';
import styled from 'styled-components';

export type SubStatus = 'done' | 'active' | 'upcoming';

interface SubRailStepProps {
  label: string;
  status: SubStatus;
  onClick?: () => void;
}

const Btn = styled.button<{ $clickable: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 5px 0 5px 38px;
  background: none;
  border: none;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  width: 100%;
  text-align: left;
`;

const Dot = styled.span<{ $status: SubStatus }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $status }) =>
    $status === 'active'
      ? 'var(--bs-accent)'
      : $status === 'done'
        ? 'var(--bs-accent2)'
        : 'transparent'};
  border: ${({ $status }) =>
    $status === 'upcoming' ? '1px solid var(--bs-line)' : 'none'};
  box-shadow: ${({ $status }) =>
    $status === 'active' ? '0 0 8px var(--bs-accent)' : 'none'};
`;

const Label = styled.span<{ $status: SubStatus }>`
  font-family: var(--bs-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  color: ${({ $status }) =>
    $status === 'upcoming' ? 'var(--bs-ink-dim)' : 'var(--bs-ink)'};
  font-weight: ${({ $status }) => ($status === 'active' ? 700 : 400)};
`;

const Tick = styled.span`
  font-family: var(--bs-mono);
  font-size: 9px;
  color: var(--bs-accent2);
  margin-left: auto;
`;

const SubRailStep = ({ label, status, onClick }: SubRailStepProps) => {
  const clickable = status === 'done' && !!onClick;
  return (
    <Btn type="button" onClick={clickable ? onClick : undefined} $clickable={clickable}>
      <Dot $status={status} />
      <Label $status={status}>{label}</Label>
      {status === 'done' && <Tick>✓</Tick>}
    </Btn>
  );
};

export default SubRailStep;
