'use client';

import { FC, Fragment } from 'react';
import styled from 'styled-components';

import StepHead from 'ui/atoms/intake/StepHead';
import NavRow from 'ui/atoms/intake/NavRow';
import GlowButton from 'ui/atoms/intake/GlowButton';
import Glyph from 'ui/atoms/intake/Glyph';
import ModChip from 'ui/atoms/intake/ModChip';
import { ARCHETYPES } from '@/lib/intake/genesis';

interface ArchetypeStepProps {
  value: string | null;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const CardBtn = styled.button<{ $active: boolean }>`
  text-align: left;
  cursor: pointer;
  padding: 16px 16px 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.18s;
  background: ${({ $active }) => ($active ? 'rgba(232, 147, 47, 0.06)' : 'rgba(8, 10, 16, 0.55)')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--bs-accent)' : 'var(--bs-line)')};
  box-shadow: ${({ $active }) =>
    $active
      ? '0 0 24px -6px var(--bs-accent), inset 0 0 0 1px rgba(232, 147, 47, 0.18)'
      : 'none'};
`;

const CardHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Badge = styled.span<{ $active: boolean }>`
  width: 28px;
  height: 28px;
  border: 1px solid ${({ $active }) => ($active ? 'var(--bs-accent)' : 'var(--bs-line)')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const Name = styled.span<{ $active: boolean }>`
  font-family: var(--bs-display);
  font-size: 14px;
  letter-spacing: 0.14em;
  color: ${({ $active }) => ($active ? '#fff' : 'var(--bs-ink)')};
  font-weight: 700;
`;

const Ethos = styled.p`
  font-family: var(--bs-mono);
  font-size: 11px;
  line-height: 1.5;
  color: var(--bs-ink-dim);
  margin: 10px 0 12px;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const SelectedTag = styled.span`
  position: absolute;
  top: 8px;
  right: 10px;
  font-family: var(--bs-mono);
  font-size: 8.5px;
  letter-spacing: 0.16em;
  color: var(--bs-accent);
`;

const Readout = styled.div`
  margin-top: 18px;
  padding: 16px 18px;
  border: 1px solid var(--bs-line);
  background: rgba(8, 10, 16, 0.5);
  min-height: 96px;
`;

const ReadHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ReadLabel = styled.div`
  font-family: var(--bs-mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  color: var(--bs-ink-dim);
`;

const ReadNet = styled.div`
  font-family: var(--bs-mono);
  font-size: 9.5px;
  letter-spacing: 0.16em;
  color: var(--bs-accent2);
`;

const Empty = styled.div`
  font-family: var(--bs-mono);
  font-size: 11px;
  color: var(--bs-ink-dim);
  letter-spacing: 0.08em;
`;

const ArchetypeStep: FC<ArchetypeStepProps> = ({ value, onChange, onNext, onBack }) => {
  const sel = ARCHETYPES.find(a => a.key === value);
  const go = () => {
    if (sel) onNext();
  };

  return (
    <Fragment>
      <StepHead
        index="01"
        total={6}
        kicker="GENESIS · ARCHETYPE"
        title="CAST THE PILOT"
        blurb="Six casts walk into the genesis forge. Each carries habits the void can't unlearn — pick the one whose flaws you can live with, not the one that flatters you."
      />

      <Grid>
        {ARCHETYPES.map(a => {
          const active = a.key === value;
          const top = Object.entries(a.mods)
            .filter(([, v]) => v > 0)
            .sort((x, y) => y[1] - x[1])
            .slice(0, 3);
          return (
            <CardBtn key={a.key} type="button" onClick={() => onChange(a.key)} $active={active}>
              <CardHead>
                <Badge $active={active}>
                  <Glyph type={a.glyph} size={14} c={active ? 'var(--bs-accent)' : 'var(--bs-ink)'} />
                </Badge>
                <Name $active={active}>{a.name}</Name>
              </CardHead>
              <Ethos>{a.ethos}</Ethos>
              <Chips>
                {top.map(([k, v]) => (
                  <ModChip key={k} label={k.slice(0, 4).toUpperCase()} v={v} />
                ))}
              </Chips>
              {active && <SelectedTag>SELECTED ✓</SelectedTag>}
            </CardBtn>
          );
        })}
      </Grid>

      <Readout>
        {sel ? (
          <Fragment>
            <ReadHead>
              <ReadLabel>SKILL MODIFIERS · {sel.name}</ReadLabel>
              <ReadNet>NET ±0</ReadNet>
            </ReadHead>
            <Chips>
              {Object.entries(sel.mods)
                .sort((a, b) => b[1] - a[1])
                .map(([k, v]) => (
                  <ModChip key={k} label={k.toUpperCase()} v={v} />
                ))}
            </Chips>
          </Fragment>
        ) : (
          <Empty>// select a cast to preview its skill modifiers</Empty>
        )}
      </Readout>

      <NavRow onBack={onBack}>
        <GlowButton onClick={go} disabled={!sel}>
          CONTINUE →
        </GlowButton>
      </NavRow>
    </Fragment>
  );
};

export default ArchetypeStep;
