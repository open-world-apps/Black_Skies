'use client';

import { FC, Fragment, useState } from 'react';
import styled from 'styled-components';

import { DOB, DobResult } from '@/lib/intake/types';
import Hint from './Hint';

interface DOBFieldProps {
  value: DOB;
  onChange: (v: DOB) => void;
  result: DobResult;
  touched?: boolean;
  onBlur?: () => void;
}

type DobKey = 'd' | 'm' | 'y';

// Locale-aware field order (US → M D Y, most of world → D M Y).
const DOB_ORDER: DobKey[] = (() => {
  try {
    const parts = new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(new Date(2000, 11, 25));
    const map: Record<string, DobKey> = { day: 'd', month: 'm', year: 'y' };
    const seq = parts
      .filter(p => p.type === 'day' || p.type === 'month' || p.type === 'year')
      .map(p => map[p.type]);
    return seq.length === 3 ? seq : ['d', 'm', 'y'];
  } catch {
    return ['d', 'm', 'y'];
  }
})();

const DOB_SPEC: Record<DobKey, { ph: string; max: number }> = {
  d: { ph: 'DD', max: 2 },
  m: { ph: 'MM', max: 2 },
  y: { ph: 'YYYY', max: 4 },
};

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Head = styled.span`
  display: flex;
  justify-content: space-between;
  font-family: var(--bs-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--bs-ink-dim);
`;

const Sub = styled.span`
  font-size: 9px;
  opacity: 0.7;
`;

const Row = styled.div<{ $line: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  border-bottom: 1px solid ${({ $line }) => $line};
  padding: 8px 2px;
  transition: border-color 0.2s;
`;

const Caret = styled.span<{ $line: string }>`
  color: ${({ $line }) => $line};
  font-family: var(--bs-mono);
  font-size: 13px;
  margin-right: 4px;
`;

const Cell = styled.input<{ $wide: boolean }>`
  width: ${({ $wide }) => ($wide ? 56 : 34)}px;
  text-align: center;
  background: transparent;
  border: none;
  outline: none;
  color: var(--bs-ink);
  font-family: var(--bs-mono);
  font-size: 15px;
  letter-spacing: 0.08em;
`;

const Slash = styled.span`
  color: var(--bs-ink-dim);
`;

const Spacer = styled.span`
  flex: 1;
`;

const Cleared = styled.span`
  font-family: var(--bs-mono);
  font-size: 11px;
  color: var(--bs-accent2);
  letter-spacing: 0.1em;
`;

const DOBField: FC<DOBFieldProps> = ({ value, onChange, result, touched, onBlur }) => {
  const [focused, setFocused] = useState(false);
  const show = !!touched && !focused;
  const err = show && result && result.err ? result.err : false;
  const line = focused
    ? 'var(--bs-accent)'
    : err
      ? '#d8533f'
      : show && result && result.err === null
        ? 'var(--bs-accent2)'
        : 'var(--bs-line)';

  return (
    <Label>
      <Head>
        <span>DATE OF BIRTH</span>
        <Sub>AGE-GATE · VERIFIED</Sub>
      </Head>
      <Row $line={line}>
        <Caret $line={line}>›</Caret>
        {DOB_ORDER.map((key, i) => (
          <Fragment key={key}>
            <Cell
              value={value[key]}
              $wide={DOB_SPEC[key].max === 4}
              onChange={e =>
                onChange({
                  ...value,
                  [key]: e.target.value.replace(/\D/g, '').slice(0, DOB_SPEC[key].max),
                })
              }
              onFocus={() => setFocused(true)}
              onBlur={() => {
                setFocused(false);
                onBlur?.();
              }}
              placeholder={DOB_SPEC[key].ph}
              inputMode="numeric"
              autoComplete="off"
            />
            {i < 2 && <Slash>/</Slash>}
          </Fragment>
        ))}
        <Spacer />
        {result && result.age != null && result.err === null && (
          <Cleared>{result.age} CYCLES ✓</Cleared>
        )}
      </Row>
      <Hint error={err} />
    </Label>
  );
};

export default DOBField;
