'use client';

import { FC } from 'react';
import styled from 'styled-components';

import Glyph from 'ui/atoms/icons/Glyph';
import { TraitPair } from '@/lib/intake/types';

interface TraitCardProps {
  pair: TraitPair;
  locked?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}

const Card = styled.button<{ $active: boolean; $locked: boolean; $disabled: boolean }>`
  text-align: left;
  cursor: ${({ $locked, $disabled }) =>
    $locked ? 'default' : $disabled ? 'not-allowed' : 'pointer'};
  padding: 14px 16px;
  position: relative;
  transition: all 0.18s;
  opacity: ${({ $disabled, $active }) => ($disabled && !$active ? 0.45 : 1)};
  background: ${({ $active, $locked }) =>
    $active
      ? $locked
        ? 'rgba(63, 185, 201, 0.04)'
        : 'rgba(232, 147, 47, 0.06)'
      : 'rgba(8, 10, 16, 0.5)'};
  border: 1px solid
    ${({ $active, $locked }) =>
      $active ? ($locked ? 'rgba(63, 185, 201, 0.45)' : 'var(--bs-accent)') : 'var(--bs-line)'};
  box-shadow: ${({ $active, $locked }) =>
    $active && !$locked ? '0 0 16px -6px var(--bs-accent)' : 'none'};
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TagLabel = styled.span<{ $locked: boolean }>`
  font-family: var(--bs-mono);
  font-size: 9px;
  letter-spacing: 0.18em;
  color: ${({ $locked }) => ($locked ? 'var(--bs-accent2)' : 'var(--bs-ink-dim)')};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const StrongTitle = styled.div`
  font-family: var(--bs-display);
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--bs-accent2);
  font-weight: 700;
`;

const WeakTitle = styled.div`
  font-family: var(--bs-display);
  font-size: 13px;
  letter-spacing: 0.08em;
  color: #c87363;
  font-weight: 700;
`;

const Desc = styled.div`
  font-family: var(--bs-mono);
  font-size: 10.5px;
  line-height: 1.45;
  color: var(--bs-ink-dim);
  margin-top: 4px;
`;

const Rationale = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed var(--bs-line);
  font-family: var(--bs-mono);
  font-size: 10px;
  line-height: 1.5;
  color: var(--bs-ink-dim);
  letter-spacing: 0.04em;
`;

const Accent2 = styled.span`
  color: var(--bs-accent2);
`;

const TraitCard = ({
  pair,
  locked = false,
  selected = false,
  disabled = false,
  onToggle,
}: TraitCardProps) => {
  const active = locked || selected;
  return (
    <Card
      type="button"
      onClick={onToggle}
      disabled={locked || disabled}
      $active={active}
      $locked={locked}
      $disabled={disabled}
    >
      <Head>
        <Tag>
          <Glyph
            type={locked ? 'cross' : selected ? 'dot' : 'ring'}
            size={11}
            c={locked ? 'var(--bs-accent2)' : selected ? 'var(--bs-accent)' : 'var(--bs-ink-dim)'}
          />
          <TagLabel $locked={locked}>
            {locked ? 'LOCKED · INFERRED' : selected ? 'SELECTED' : 'AVAILABLE'}
          </TagLabel>
        </Tag>
      </Head>
      <Grid>
        <div>
          <StrongTitle>+ {pair.strong}</StrongTitle>
          <Desc>{pair.sDesc}</Desc>
        </div>
        <div>
          <WeakTitle>− {pair.weak}</WeakTitle>
          <Desc>{pair.wDesc}</Desc>
        </div>
      </Grid>
      {locked && (
        <Rationale>
          // <Accent2>rationale:</Accent2> {pair.rationale}
        </Rationale>
      )}
    </Card>
  );
};

export default TraitCard;
