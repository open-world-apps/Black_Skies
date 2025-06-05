'use client';

import { css } from '@/lib/configs/stitches.config';
import { ContainerSizing } from '@/lib/types';
import React, { ReactNode } from 'react';

interface Props {
  display?: 'block' | 'inline' | 'inline block';
  height?: ContainerSizing;
  width?: ContainerSizing;
  border?: string;
  margin?: string;
  padding?: string;
  children?: ReactNode;
}

const Container = ({
  children,
  display = 'block',
  height = 'fit-content',
  width = 'fit-content',
  margin,
  border,
  padding,
}: Props) => {
  const className = css({
    display,
    height,
    width,
    padding,
    ...(!!margin && { margin: margin }),
    ...(!!border && { border: border }),
  })();

  return <div className={className}>{children}</div>;
};

export default Container;
