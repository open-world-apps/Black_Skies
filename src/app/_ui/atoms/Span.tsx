'use client';

import { FAlign, FJustify, Height, Width } from '@/lib/types';
import styled from 'styled-components';

interface Props {
  height?: Height;
  width?: Width;
  $flex?: boolean;
  $inline?: boolean;
  $row?: boolean;
  $column?: boolean;
  $justifyContent?: FJustify;
  $alignItems?: FAlign;
  gap?: string;
  $rowGap?: string;
  $colGap?: string;
  $margin?: string;
  $padding?: string;
  $overflowHidden?: boolean;
}

const Span = styled.span<Props>`
  ${({ $flex }) => $flex && 'display: flex'};
  ${({ $inline }) => $inline && 'display: inline-flex;'};
  ${({ $column }) => $column && 'flex-direction: column;'};
  ${({ $row }) => $row && 'flex-direction: row;'};
  gap: ${({ gap }) => gap ?? 'initial'};
  row-gap: ${({ $rowGap }) => $rowGap ?? 'initial'};
  column-gap: ${({ $colGap }) => $colGap ?? 'initial'};
  height: ${({ height }) => height ?? 'initial'};
  width: ${({ width }) => width ?? 'initial'};
  justify-content: ${({ $justifyContent }) => $justifyContent ?? 'initial'};
  align-items: ${({ $alignItems }) => $alignItems ?? 'initial'};
  padding: ${({ $padding }) => $padding ?? '0px'};
  margin: ${({ $margin }) => $margin ?? '0px'};
  ${({ $overflowHidden }) => $overflowHidden && 'overflow: hidden;'};
`;

interface ClickableSpanProps {
  $onClick: () => void;
}

export const ClickableSpan = styled(Span).attrs<ClickableSpanProps>(
  ({ $onClick }) => ({
    onClick: $onClick,
  })
)<Props>`
  cursor: pointer;
`;

export default Span;
