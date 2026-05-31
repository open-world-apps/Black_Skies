'use client';

import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface NavRowProps {
  onBack?: () => void;
  backLabel?: string;
  children?: ReactNode;
  leftExtra?: ReactNode;
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 38px;
  gap: 16px;
`;

const Left = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  gap: 12px;
`;

export const TextButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--bs-mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--bs-ink-dim);
  padding: 8px 0;
`;

const NavRow: FC<NavRowProps> = ({
  onBack,
  backLabel = '← BACK',
  children,
  leftExtra,
}) => (
  <Wrap>
    <Left>
      {onBack ? (
        <TextButton type="button" onClick={onBack}>
          {backLabel}
        </TextButton>
      ) : (
        <span />
      )}
      {leftExtra}
    </Left>
    <Right>{children}</Right>
  </Wrap>
);

export default NavRow;
