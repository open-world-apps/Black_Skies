'use client';

import { FC, useState } from 'react';
import styled from 'styled-components';

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  mono?: boolean;
  autoFocus?: boolean;
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

const Row = styled.div<{ $focused: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid
    ${({ $focused }) => ($focused ? 'var(--bs-accent)' : 'var(--bs-line)')};
  padding: 8px 2px;
  transition: border-color 0.2s;
`;

const Caret = styled.span<{ $focused: boolean }>`
  color: ${({ $focused }) => ($focused ? 'var(--bs-accent)' : 'var(--bs-ink-dim)')};
  font-family: var(--bs-mono);
  font-size: 13px;
`;

const Inp = styled.input<{ $mono: boolean }>`
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  color: var(--bs-ink);
  font-family: ${({ $mono }) => ($mono ? 'var(--bs-mono)' : 'var(--bs-display)')};
  font-size: 15px;
  letter-spacing: 0.04em;
`;

const Field: FC<FieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  mono = true,
  autoFocus,
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <Label>
      <Head>{label}</Head>
      <Row $focused={focused}>
        <Caret $focused={focused}>›</Caret>
        <Inp
          value={value}
          onChange={e => onChange(e.target.value)}
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          $mono={mono}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </Row>
    </Label>
  );
};

export default Field;
