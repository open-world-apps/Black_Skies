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

export default FlexContainer;
