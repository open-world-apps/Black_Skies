'use client';

import { } from 'react';
import styled from 'styled-components';

interface DossierRowProps {
  label: string;
  value: string;
  mono?: boolean;
  accent?: string;
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding: 11px 0;
  border-bottom: 1px solid var(--bs-line);
`;

const Label = styled.span`
  font-family: var(--bs-mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  color: var(--bs-ink-dim);
  white-space: nowrap;
`;

const Value = styled.span<{ $mono: boolean; $accent: string }>`
  font-family: ${({ $mono }) => ($mono ? 'var(--bs-mono)' : 'var(--bs-display)')};
  font-size: 14px;
  letter-spacing: 0.03em;
  color: ${({ $accent }) => $accent};
  text-align: right;
  white-space: nowrap;
`;

const DossierRow = ({
  label,
  value,
  mono = true,
  accent = 'var(--bs-ink)',
}: DossierRowProps) => (
  <Row>
    <Label>{label}</Label>
    <Value $mono={mono} $accent={accent}>
      {value}
    </Value>
  </Row>
);

export default DossierRow;
