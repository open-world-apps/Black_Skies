'use client';

import { Direction, FAlign, FJustify, Height, Width } from '@/lib/types';
import styled from 'styled-components';

interface Props {
  height?: Height;
  width?: Width;
  display?: 'flex' | 'inline-flex';
  direction?: Direction;
  $justifyContent?: FJustify;
  $alignItems?: FAlign;
  gap?: string;
  $rowGap?: string;
  $colGap?: string;
  margin?: string;
  padding?: string;
}

const FlexContainer = styled.div<Props>`
  display: ${({ display }) => display ?? 'flex'};
  flex-direction: ${({ direction }) => direction ?? 'column'};
  gap: ${({ gap }) => gap ?? 'initial'};
  row-gap: ${({ $rowGap }) => $rowGap ?? 'initial'};
  column-gap: ${({ $colGap }) => $colGap ?? 'initial'};
  height: ${({ height }) => height ?? 'initial'};
  width: ${({ width }) => width ?? 'initial'};
  justify-content: ${({ $justifyContent }) => $justifyContent ?? 'initial'};
  align-items: ${({ $alignItems }) => $alignItems ?? 'initial'};
  padding: ${({ padding }) => padding ?? '0px'};
`;

export default FlexContainer;
