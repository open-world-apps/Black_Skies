'use client';

import React, { FC, ReactElement } from 'react';
import CharStat from '../atoms/game/CharStat';
import Divider from '../atoms/generic/Divider';
import FlexContainer from '../primitives/FlexContainer';
import Span from '../atoms/generic/Span';
import SLink from '../atoms/generic/SLink';
import { formatCurrency } from '@/lib/convertors/money';
import { selectAuthState } from '@/lib/state/reducers/auth/authSlice';
import { useAppSelector } from '@/lib/state/app/hooks';

const CharStats: FC = (): ReactElement => {
  const isLoggedIn = useAppSelector(selectAuthState);
  if (isLoggedIn) {
    return (
      <FlexContainer colGap="10px" width="fit-content">
        <Span>
          Health:&nbsp;
          <SLink href="/character/1/health">
            <CharStat stat={100} />
          </SLink>
        </Span>
        <Divider />
        <Span>
          Money:&nbsp;
          <CharStat stat={formatCurrency(1000000)} />
        </Span>
        <Divider />
        <Span>
          Mood:&nbsp;
          <CharStat stat={'Happy'} />
        </Span>
      </FlexContainer>
    );
  } else {
    return <></>;
  }
};

export default CharStats;
