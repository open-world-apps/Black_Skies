'use client';

import { FAlign, FJustify, ContainerSizing, Size } from '@/lib/types';
import styled from 'styled-components';

interface Props {
  height?: ContainerSizing;
  width?: ContainerSizing;
  display?: 'flex' | 'inline-flex';
  $inline?: boolean;
  $row?: boolean;
  $column?: boolean;
  $justifyContent?: FJustify;
  $alignItems?: FAlign;
  $gap?: Size;
  $rowGap?: Size;
  $colGap?: Size;
  $margin?: string;
  $padding?: string;
  $overflowHidden?: boolean;
}

const FlexContainer = styled.div<Props>`
  display: flex;
  ${({ $inline }) => $inline && 'display: inline-flex;'};
  ${({ $column }) => $column && 'flex-direction: column;'};
  ${({ $row }) => $row && 'flex-direction: row;'};
  gap: ${({ $gap: gap }) => gap ?? 'initial'};
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

interface BorderProps {
  $border?: string;
  $borderR?: string;
  $borderL?: string;
  $borderT?: string;
  $borderB?: string;
}

export const BorderedFlex = styled(FlexContainer)<BorderProps>`
  ${({ $border }) => $border && `border: ${$border}`};
  ${({ $borderR }) => $borderR && `border: ${$borderR}`};
  ${({ $borderL }) => $borderL && `border: ${$borderL}`};
  ${({ $borderT }) => $borderT && `border: ${$borderT}`};
  ${({ $borderB }) => $borderB && `border: ${$borderB}`};
`;

export default FlexContainer;
