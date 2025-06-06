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
  background?: string;
  alignSelf?: string;
  justifySelf?: string;
}

const Container = ({
  children,
  display = 'block',
  height = 'fit-content',
  width = 'fit-content',
  background,
  margin,
  border,
  padding,
  alignSelf,
  justifySelf,
}: Props) => {
  const className = css({
    background,
    display,
    height,
    width,
    padding,
    margin,
    border,
    alignSelf,
    justifySelf,
  })();

  return <div className={className}>{children}</div>;
};

export default Container;
