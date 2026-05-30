'use client';

import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';

import Glyph from './Glyph';
import Hint from './Hint';

interface ValFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: string | null;
  valid?: boolean;
  touched?: boolean;
  onBlur?: () => void;
  autoFocus?: boolean;
  hint?: string;
  suffix?: ReactNode;
}

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Head = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--bs-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--bs-ink-dim);
`;

const HeadHint = styled.span`
  font-size: 9px;
  opacity: 0.7;
  letter-spacing: 0.08em;
`;

const Row = styled.div<{ $line: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid ${({ $line }) => $line};
  padding: 8px 2px;
  transition: border-color 0.2s;
`;

const Caret = styled.span<{ $line: string }>`
  color: ${({ $line }) => $line};
  font-family: var(--bs-mono);
  font-size: 13px;
`;

const Inp = styled.input`
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  color: var(--bs-ink);
  font-family: var(--bs-mono);
  font-size: 15px;
  letter-spacing: 0.04em;
`;

const ValField: FC<ValFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  valid,
  touched,
  onBlur,
  autoFocus,
  hint,
  suffix,
}) => {
  const [focused, setFocused] = useState(false);
  const show = !!touched && !focused;
  const line = focused
    ? 'var(--bs-accent)'
    : show && error
      ? '#d8533f'
      : show && valid
        ? 'var(--bs-accent2)'
        : 'var(--bs-line)';

  return (
    <Label>
      <Head>
        <span>{label}</span>
        {hint && <HeadHint>{hint}</HeadHint>}
      </Head>
      <Row $line={line}>
        <Caret $line={line}>›</Caret>
        <Inp
          value={value}
          onChange={e => onChange(e.target.value)}
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck={false}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
        />
        {suffix}
        {show &&
          (error ? (
            <Glyph type="cross" size={14} c="#d8533f" />
          ) : valid ? (
            <Glyph type="dot" size={12} c="var(--bs-accent2)" />
          ) : null)}
      </Row>
      <Hint error={show && error} />
    </Label>
  );
};

export default ValField;
