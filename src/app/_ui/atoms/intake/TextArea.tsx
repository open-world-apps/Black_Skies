'use client';

import { FC, useState } from 'react';
import styled from 'styled-components';

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  rows?: number;
  maxLen?: number;
  autoFocus?: boolean;
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
  align-items: flex-start;
  gap: 8px;
  border-bottom: 1px solid ${({ $line }) => $line};
  padding: 8px 2px;
  transition: border-color 0.2s;
`;

const Caret = styled.span<{ $line: string }>`
  color: ${({ $line }) => $line};
  font-family: var(--bs-mono);
  font-size: 13px;
  padding-top: 2px;
`;

const Area = styled.textarea`
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  color: var(--bs-ink);
  font-family: var(--bs-mono);
  font-size: 13px;
  letter-spacing: 0.02em;
  resize: vertical;
  line-height: 1.55;
`;

const Count = styled.span`
  font-family: var(--bs-mono);
  font-size: 9.5px;
  color: var(--bs-ink-dim);
  letter-spacing: 0.08em;
  text-align: right;
`;

const TextArea: FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  hint,
  rows = 4,
  maxLen,
  autoFocus,
}) => {
  const [focused, setFocused] = useState(false);
  const line = focused ? 'var(--bs-accent)' : 'var(--bs-line)';
  return (
    <Label>
      <Head>
        <span>{label}</span>
        {hint && <HeadHint>{hint}</HeadHint>}
      </Head>
      <Row $line={line}>
        <Caret $line={line}>›</Caret>
        <Area
          value={value}
          onChange={e => onChange(maxLen ? e.target.value.slice(0, maxLen) : e.target.value)}
          autoFocus={autoFocus}
          rows={rows}
          placeholder={placeholder}
          spellCheck={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </Row>
      {maxLen && (
        <Count>
          {(value || '').length} / {maxLen}
        </Count>
      )}
    </Label>
  );
};

export default TextArea;
