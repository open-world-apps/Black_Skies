'use client';

import { Size } from '@/lib/types';
import { css } from '@/lib/configs/stitches.config';
import React, { FC, ReactElement, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  background?: string;
  border?: string;
  borderRadius?: Size;
  height?: Size;
  width?: Size;
  margin?: string;
  padding?: string;
  overflowHidden?: boolean;
}

const Span: FC<Props> = ({
  children,
  background,
  border,
  borderRadius,
  height,
  width,
  margin,
  padding,
  overflowHidden = false,
}): ReactElement => {
  const style = css({
    background,
    height,
    width,
    margin,
    padding,
    border,
    borderRadius,
    ...(!!overflowHidden && { overflow: 'hidden' }),
  })();

  return <span className={style}>{children}</span>;
};

export default Span;
