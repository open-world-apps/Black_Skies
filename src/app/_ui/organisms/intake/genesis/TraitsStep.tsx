'use client';

import { FC, Fragment } from 'react';
import styled from 'styled-components';

import StepHead from 'ui/molecules/intake/StepHead';
import NavRow from 'ui/molecules/layout/NavRow';
import GlowButton from 'ui/atoms/buttons/GlowButton';
import TraitCard from 'ui/molecules/intake/TraitCard';
import { TRAIT_PAIRS } from '@/lib/intake/genesis';

interface TraitsStepProps {
  lockedKeys: string[];
  picked: string[];
  onTogglePick: (key: string) => void;
  pickTarget?: number;
  onNext: () => void;
  onBack: () => void;
}

const SectionLabel = styled.div<{ $accent2?: boolean }>`
  font-family: var(--bs-mono);
  font-size: 9.5px;
  letter-spacing: 0.22em;
  color: ${({ $accent2 }) => ($accent2 ? 'var(--bs-accent2)' : 'var(--bs-accent)')};
  margin-bottom: 8px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PickHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 22px;
  margin-bottom: 8px;
`;

const Counter = styled.div<{ $done: boolean }>`
  font-family: var(--bs-mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  color: ${({ $done }) => ($done ? 'var(--bs-accent2)' : 'var(--bs-accent)')};
`;

const Warn = styled.div`
  margin-top: 22px;
  padding: 10px 14px;
  border: 1px solid var(--bs-line);
  background: rgba(8, 10, 16, 0.45);
  font-family: var(--bs-mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  color: var(--bs-ink-dim);
  line-height: 1.55;
`;

const Mark = styled.span`
  color: var(--bs-accent);
`;

const TraitsStep = ({
  lockedKeys,
  picked,
  onTogglePick,
  pickTarget = 2,
  onNext,
  onBack,
}: TraitsStepProps) => {
  const lockedPairs = TRAIT_PAIRS.filter(p => lockedKeys.includes(p.key));
  const pickablePairs = TRAIT_PAIRS.filter(p => !lockedKeys.includes(p.key));
  const remaining = pickTarget - picked.length;
  const ready = remaining === 0;

  return (
    <Fragment>
      <StepHead
        index="04"
        total={6}
        kicker="GENESIS · TRAITS"
        title="STRENGTHS BIND TO WEIGHT"
        blurb="Every gift the void offered you was taken with a price. The forge already pulled three pairs from your dossier — choose two more it didn't see."
      />

      <SectionLabel $accent2>· LOCKED BY THE FORGE</SectionLabel>
      <List>
        {lockedPairs.map(p => (
          <TraitCard key={p.key} pair={p} locked />
        ))}
      </List>

      <PickHead>
        <SectionLabel style={{ marginBottom: 0 }}>· CHOOSE 2 MORE</SectionLabel>
        <Counter $done={!remaining}>
          {picked.length} / {pickTarget}{' '}
          {remaining > 0 ? `· ${remaining} REMAINING` : '· COMPLETE ✓'}
        </Counter>
      </PickHead>
      <List>
        {pickablePairs.map(p => {
          const sel = picked.includes(p.key);
          const limit = !sel && picked.length >= pickTarget;
          return (
            <TraitCard
              key={p.key}
              pair={p}
              selected={sel}
              disabled={limit}
              onToggle={() => onTogglePick(p.key)}
            />
          );
        })}
      </List>

      <Warn>
        <Mark>※</Mark> The forge reads between your lines. Nothing here is editable
        after seal — go back if you want to revise the truth.
      </Warn>

      <NavRow onBack={onBack}>
        <GlowButton onClick={onNext} disabled={!ready}>
          {ready ? 'CONTINUE →' : `PICK ${remaining} MORE`}
        </GlowButton>
      </NavRow>
    </Fragment>
  );
};

export default TraitsStep;
