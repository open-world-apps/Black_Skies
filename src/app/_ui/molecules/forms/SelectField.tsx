'use client';

import { useState } from 'react';
import styled from 'styled-components';

import Glyph from 'ui/atoms/icons/Glyph';
import Hint from 'ui/atoms/text/Hint';

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  error?: string | null;
  touched?: boolean;
  onBlur?: () => void;
}

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Head = styled.span`
  font-family: var(--bs-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--bs-ink-dim);
`;

const Row = styled.div<{ $line: string }>`
  position: relative;
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

const Sel = styled.select<{ $hasValue: boolean }>`
  flex: 1;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ $hasValue }) => ($hasValue ? 'var(--bs-ink)' : 'var(--bs-ink-dim)')};
  font-family: var(--bs-mono);
  font-size: 15px;
  letter-spacing: 0.04em;
  cursor: pointer;

  option {
    background: #0a0c12;
    color: var(--bs-ink);
  }
`;

const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'select…',
  error,
  touched,
  onBlur,
}: SelectFieldProps) => {
  const [focused, setFocused] = useState(false);
  const show = !!touched && !focused;
  const line = focused
    ? 'var(--bs-accent)'
    : show && error
      ? '#d8533f'
      : show && value
        ? 'var(--bs-accent2)'
        : 'var(--bs-line)';

  return (
    <Label>
      <Head>{label}</Head>
      <Row $line={line}>
        <Caret $line={line}>›</Caret>
        <Sel
          value={value}
          $hasValue={!!value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
        >
          <option value="">{placeholder}</option>
          {options.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Sel>
        <Glyph type="chevron" size={11} c="var(--bs-ink-dim)" />
      </Row>
      <Hint error={show && error} />
    </Label>
  );
};

export default SelectField;
