import React, { FC, ReactElement } from 'react';
import CharStat from '../atoms/game/CharStat';
import Divider from '../atoms/generic/Divider';
import FlexContainer from '../atoms/generic/FlexContainer';
import Span from '../atoms/generic/Span';
import SLink from '../atoms/generic/SLink';
import { formatCurrency } from '@/lib/convertors/money';

const CharStats: FC = (): ReactElement => {
  return (
    <FlexContainer $colGap={'10px'} width={'fit-content'}>
      <Span>
        Health:&nbsp;
        <SLink href="/character/1/health" $noUnderline>
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
};

export default CharStats;
