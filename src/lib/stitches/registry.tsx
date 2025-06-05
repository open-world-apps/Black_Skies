'use client';

import globalStyles from '@/lib/stitches/globalStyles';
import React, { FC, ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const StitchesRegistry: FC<Props> = ({ children }): ReactElement => {
  globalStyles();

  return <>{children}</>;
};

export default StitchesRegistry;
