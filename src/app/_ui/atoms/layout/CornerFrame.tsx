'use client';

import { CSSProperties, FC, ReactNode } from 'react';
import styled from 'styled-components';

interface CornerFrameProps {
  children?: ReactNode;
  color?: string;
  len?: number;
  style?: CSSProperties;
}

const Wrap = styled.div`
  position: relative;
`;

const Corner = styled.span<{ $len: number; $color: string }>`
  position: absolute;
  width: ${({ $len }) => $len}px;
  height: ${({ $len }) => $len}px;
  border-color: ${({ $color }) => $color};
  pointer-events: none;
`;

const CornerFrame: FC<CornerFrameProps> = ({
  children,
  color = 'var(--bs-line)',
  len = 14,
  style = {},
}) => (
  <Wrap style={style}>
    <Corner $len={len} $color={color} style={{ top: 0, left: 0, borderTop: '1px solid', borderLeft: '1px solid' }} />
    <Corner $len={len} $color={color} style={{ top: 0, right: 0, borderTop: '1px solid', borderRight: '1px solid' }} />
    <Corner $len={len} $color={color} style={{ bottom: 0, left: 0, borderBottom: '1px solid', borderLeft: '1px solid' }} />
    <Corner $len={len} $color={color} style={{ bottom: 0, right: 0, borderBottom: '1px solid', borderRight: '1px solid' }} />
    {children}
  </Wrap>
);

export default CornerFrame;
