'use client';

import { FC, Fragment } from 'react';
import styled from 'styled-components';

import StepHead from 'ui/atoms/intake/StepHead';
import NavRow from 'ui/atoms/intake/NavRow';
import GlowButton from 'ui/atoms/intake/GlowButton';
import Glyph from 'ui/atoms/intake/Glyph';
import FactionCard from 'ui/molecules/intake/FactionCard';
import { FACTIONS } from '@/lib/intake/genesis';

interface AllegianceStepProps {
  value: string | null;
  onChange: (v: string | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const UnalignedBtn = styled.button<{ $selected: boolean }>`
  text-align: left;
  cursor: pointer;
  padding: 14px 18px;
  transition: all 0.18s;
  background: ${({ $selected }) =>
    $selected ? 'rgba(255, 255, 255, 0.03)' : 'rgba(8, 10, 16, 0.35)'};
  border: 1px dashed ${({ $selected }) => ($selected ? 'var(--bs-ink-dim)' : 'var(--bs-line)')};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Title = styled.div<{ $selected: boolean }>`
  font-family: var(--bs-display);
  font-size: 13px;
  letter-spacing: 0.14em;
  color: ${({ $selected }) => ($selected ? '#fff' : 'var(--bs-ink-dim)')};
  font-weight: 700;
`;

const Sub = styled.div`
  font-family: var(--bs-mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  color: var(--bs-ink-dim);
  margin-top: 3px;
`;

const SelectedTag = styled.span`
  font-family: var(--bs-mono);
  font-size: 9px;
  letter-spacing: 0.18em;
  color: var(--bs-ink);
`;

const AllegianceStep: FC<AllegianceStepProps> = ({ value, onChange, onNext, onBack }) => (
  <Fragment>
    <StepHead
      index="05"
      total={6}
      kicker="GENESIS · ALLEGIANCE"
      title="STANDING INVITATIONS"
      blurb="Three sponsors have an open door for you. Pick one and start with their patronage — keys, perks and the gravity that comes with them. You can also walk in unaligned. Most never make it back to neutral."
    />

    <List>
      {FACTIONS.map(f => (
        <FactionCard
          key={f.key}
          f={f}
          selected={value === f.key}
          onToggle={() => onChange(value === f.key ? null : f.key)}
        />
      ))}
      <UnalignedBtn type="button" onClick={() => onChange(null)} $selected={value === null}>
        <Row>
          <Glyph type="ring" size={14} c={value === null ? 'var(--bs-ink)' : 'var(--bs-ink-dim)'} />
          <div style={{ flex: 1 }}>
            <Title $selected={value === null}>WALK IN UNALIGNED</Title>
            <Sub>
              no sponsor, no protection, no debt. you&apos;ll feel the cold of it
              before the first dock.
            </Sub>
          </div>
          {value === null && <SelectedTag>SELECTED ✓</SelectedTag>}
        </Row>
      </UnalignedBtn>
    </List>

    <NavRow onBack={onBack}>
      <GlowButton kind={value ? 'a' : 't'} onClick={onNext}>
        {value ? 'ACCEPT & CONTINUE →' : 'STAY UNALIGNED →'}
      </GlowButton>
    </NavRow>
  </Fragment>
);

export default AllegianceStep;
