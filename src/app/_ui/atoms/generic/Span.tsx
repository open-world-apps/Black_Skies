'use client';

import { Size } from '@/lib/types';
import { css } from '@/lib/configs/stitches.config';
import React, { FC, ReactElement, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  height?: Size;
  width?: Size;
  margin?: string;
  padding?: string;
  overflowHidden?: boolean;
}

const Span: FC<Props> = ({
  children,
  height,
  width,
  margin,
  padding,
  overflowHidden = false,
}): ReactElement => {
  const style = css({
    height,
    width,
    margin,
    padding,
    ...(!!overflowHidden && { overflow: 'hidden' }),
  })();

  return <span className={style}>{children}</span>;
};

export default Span;
