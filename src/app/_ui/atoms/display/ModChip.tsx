'use client';

import { } from 'react';
import styled from 'styled-components';

interface ModChipProps {
  label: string;
  v: number;
}

const Chip = styled.span<{ $pos: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--bs-mono);
  font-size: 9.5px;
  letter-spacing: 0.12em;
  color: ${({ $pos }) => ($pos ? 'var(--bs-accent2)' : 'var(--bs-ink-dim)')};
  padding: 3px 7px;
  border: 1px solid
    ${({ $pos }) => ($pos ? 'rgba(63, 185, 201, 0.35)' : 'var(--bs-line)')};
  white-space: nowrap;
`;

const Value = styled.strong<{ $pos: boolean }>`
  color: ${({ $pos }) => ($pos ? 'var(--bs-accent2)' : '#a85a4d')};
  font-weight: 700;
`;

const ModChip = ({ label, v }: ModChipProps) => {
  const pos = v > 0;
  return (
    <Chip $pos={pos}>
      {label}{' '}
      <Value $pos={pos}>
        {pos ? '+' : ''}
        {v}
      </Value>
    </Chip>
  );
};

export default ModChip;
