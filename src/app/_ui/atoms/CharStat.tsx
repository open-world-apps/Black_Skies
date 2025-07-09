'use client';

import React, { FC, ReactElement, useState, useEffect } from 'react';
import Span from './Span';

interface Props {
  stat: number | string;
}

const CharStat: FC<Props> = ({ stat }): ReactElement => {
  const [_stat, setStat] = useState<number | string>(stat);

  useEffect(() => {
    setStat(stat);
  }, [stat]);

  return <Span>{_stat}</Span>;
};

export default CharStat;
