'use client';

import { css } from '@/lib/configs/stitches.config';
import { FAlign, FJustify, ContainerSizing, Size } from '@/lib/types';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  background?: string; // TODO Move to Container
  height?: ContainerSizing; // TODO Move to Container
  width?: ContainerSizing; // TODO Move to Container
  position?: string;
  inline?: boolean;
  row?: boolean;
  column?: boolean;
  justifyContent?: FJustify;
  alignItems?: FAlign;
  gap?: Size;
  rowGap?: Size;
  colGap?: Size;
  margin?: string;
  padding?: Size;
  overflowHidden?: boolean;
  alignSelf?: string;
  justifySelf?: string;
  top?: '0' | Size;
  zIndex?: number;
}

const FlexContainer = ({
  children,
  background,
  height,
  width,
  position,
  inline,
  column,
  justifyContent,
  alignItems,
  gap,
  rowGap,
  colGap,
  margin = '0px',
  padding = '0px',
  overflowHidden,
  alignSelf,
  justifySelf,
  top,
  zIndex,
}: Props) => {
  const className = css({
    background,
    padding,
    margin,
    height,
    width,
    top,
    zIndex,
    justifyContent,
    alignItems,
    gap,
    rowGap,
    columnGap: colGap,
    alignSelf,
    justifySelf,
    display: 'flex',
    ...(!!overflowHidden && { overflow: 'hidden' }),
    ...(!!inline && { display: 'inline-flex' }),
    ...(!!column && { flexDirection: 'column' }),
    ...(!!position && { position: position }),
  })();

  return <div className={className}>{children}</div>;
};

/* const FlexContainer = styled.div<Props>`
  display: flex;
  ${({ $position }) => $position && `position: ${$position};`}
  ${({ $top }) => $top && `top: ${$top};`}
  ${({ $zIndex }) => $zIndex && `z-index: ${$zIndex};`}
  ${({ $background }) => $background && `background: ${$background};`}
  ${({ $inline }) => $inline && 'display: inline-flex;'}
  ${({ $column }) => $column && 'flex-direction: column;'}
  ${({ $row }) => $row && 'flex-direction: row;'}
  align-self: ${({ $alignSelf }) => $alignSelf ?? 'initial'};
  justify-self: ${({ $justifySelf }) => $justifySelf ?? 'initial'};
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
`; */

export default FlexContainer;
