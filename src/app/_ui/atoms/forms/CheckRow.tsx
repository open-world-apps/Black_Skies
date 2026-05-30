'use client';

import { FC, ReactNode } from 'react';
import styled from 'styled-components';

import Hint from './Hint';

interface CheckRowProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
  error?: string | null;
  touched?: boolean;
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Toggle = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0;
`;

const Box = styled.span<{ $checked: boolean; $err: boolean }>`
  flex-shrink: 0;
  margin-top: 1px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s;
  border: 1px solid
    ${({ $checked, $err }) =>
      $checked ? 'var(--bs-accent)' : $err ? '#d8533f' : 'var(--bs-line)'};
  background: ${({ $checked }) => ($checked ? 'var(--bs-accent)' : 'transparent')};
  box-shadow: ${({ $checked }) =>
    $checked ? '0 0 12px -2px var(--bs-accent)' : 'none'};
`;

const Tick = styled.span`
  color: #05060a;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`;

const Text = styled.span`
  font-family: var(--bs-mono);
  font-size: 12px;
  line-height: 1.55;
  color: var(--bs-ink);
  letter-spacing: 0.02em;
`;

const CheckRow: FC<CheckRowProps> = ({
  checked,
  onChange,
  children,
  error,
  touched,
}) => {
  const show = !!touched && !!error && !checked;
  return (
    <Wrap>
      <Toggle type="button" onClick={() => onChange(!checked)}>
        <Box $checked={checked} $err={show}>
          {checked && <Tick>✓</Tick>}
        </Box>
        <Text>{children}</Text>
      </Toggle>
      <Hint error={show && error} />
    </Wrap>
  );
};

export default CheckRow;
