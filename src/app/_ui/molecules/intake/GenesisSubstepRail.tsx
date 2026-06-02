'use client';

import { } from 'react';
import styled from 'styled-components';

import SubRailStep, { SubStatus } from './SubRailStep';
import { GENESIS_SUBSTEPS } from '@/lib/intake/genesis';

interface GenesisSubstepRailProps {
  subIndex: number;
  maxReached: number;
  onJump: (i: number) => void;
}

const Wrap = styled.div`
  padding-top: 2px;
  padding-bottom: 12px;
  margin-top: -14px;
`;

const GenesisSubstepRail = ({ subIndex, maxReached, onJump }: GenesisSubstepRailProps) => (
  <Wrap>
    {GENESIS_SUBSTEPS.map((s, i) => {
      const status: SubStatus = i < subIndex ? 'done' : i === subIndex ? 'active' : 'upcoming';
      const canJump = i <= maxReached;
      return (
        <SubRailStep
          key={s.key}
          label={s.label}
          status={status}
          onClick={canJump ? () => onJump(i) : undefined}
        />
      );
    })}
  </Wrap>
);

export default GenesisSubstepRail;
