'use client';

import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  kind?: 'a' | 't';
  wide?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const Btn = styled.button<{ $col: string; $wide?: boolean }>`
  font-family: var(--bs-mono);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border-radius: 2px;
  padding: 13px 22px;
  width: ${({ $wide }) => ($wide ? '100%' : 'auto')};
  transition: all 0.18s;
  color: ${({ $col }) => $col};
  background: transparent;
  border: 1px solid ${({ $col }) => $col};
  cursor: pointer;

  &:hover:not(:disabled) {
    color: #05060a;
    background: ${({ $col }) => $col};
    box-shadow: 0 0 22px -2px ${({ $col }) => $col};
  }

  &:disabled {
    color: var(--bs-ink-dim);
    background: transparent;
    border-color: var(--bs-line);
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const GlowButton: FC<GlowButtonProps> = ({
  children,
  onClick,
  kind = 'a',
  wide,
  type = 'button',
  disabled,
}) => {
  const col = kind === 't' ? 'var(--bs-accent2)' : 'var(--bs-accent)';
  return (
    <Btn type={type} onClick={onClick} disabled={disabled} $col={col} $wide={wide}>
      {children}
    </Btn>
  );
};

export default GlowButton;
