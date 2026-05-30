'use client';

import { FC, Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

import StepHead from 'ui/atoms/text/StepHead';
import NavRow from 'ui/atoms/layout/NavRow';
import GlowButton from 'ui/atoms/buttons/GlowButton';
import Glyph from 'ui/atoms/icons/Glyph';
import SkillBar from 'ui/molecules/intake/SkillBar';
import { ARCHETYPES } from '@/lib/intake/genesis';
import { SkillRow } from '@/lib/intake/types';

interface ForgeStepProps {
  sheet: SkillRow[];
  archetype: string | null;
  onNext: () => void;
  onBack: () => void;
}

const HeaderStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border: 1px solid var(--bs-line);
  background: rgba(8, 10, 16, 0.55);
  margin-bottom: 14px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Badge = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid var(--bs-accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const ArchName = styled.div`
  font-family: var(--bs-display);
  font-size: 14px;
  letter-spacing: 0.14em;
  color: #fff;
  font-weight: 700;
`;

const ArchSub = styled.div`
  font-family: var(--bs-mono);
  font-size: 9.5px;
  letter-spacing: 0.16em;
  color: var(--bs-ink-dim);
  margin-top: 2px;
`;

const TotalLabel = styled.div`
  font-family: var(--bs-mono);
  font-size: 9.5px;
  letter-spacing: 0.16em;
  color: var(--bs-ink-dim);
`;

const TotalValue = styled.div`
  font-family: var(--bs-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--bs-accent2);
  letter-spacing: 0.04em;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
`;

const GroupLabel = styled.div<{ $top?: boolean }>`
  font-family: var(--bs-mono);
  font-size: 9.5px;
  letter-spacing: 0.22em;
  color: var(--bs-accent);
  margin-top: ${({ $top }) => ($top ? 18 : 0)}px;
  margin-bottom: 6px;
`;

const ModPanel = styled.div`
  margin-top: 22px;
  padding: 12px 14px;
  border: 1px solid rgba(232, 147, 47, 0.4);
  background: rgba(232, 147, 47, 0.06);
`;

const ModHead = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--bs-display);
  font-size: 11.5px;
  letter-spacing: 0.16em;
  color: var(--bs-accent);
  font-weight: 700;
`;

const ModBody = styled.p`
  font-family: var(--bs-mono);
  font-size: 10.5px;
  line-height: 1.55;
  color: var(--bs-ink-dim);
  margin: 7px 0 0;
`;

const Disclaimer = styled.div`
  margin-top: 18px;
  padding: 10px 14px;
  border: 1px dashed var(--bs-line);
  font-family: var(--bs-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--bs-ink-dim);
  line-height: 1.6;
`;

const ForgeStep: FC<ForgeStepProps> = ({ sheet, archetype, onNext, onBack }) => {
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReveal(true), 80);
    return () => clearTimeout(t);
  }, []);

  const arch = ARCHETYPES.find(a => a.key === archetype) || ARCHETYPES[0];
  const total = sheet.reduce((s, x) => s + x.total, 0);
  const ceiling = sheet.find(x => x.total >= 13);
  const flight = sheet.filter(x => x.cat === 'flight');
  const tech = sheet.filter(x => x.cat === 'tech');
  const soul = sheet.filter(x => x.cat === 'soul');

  return (
    <Fragment>
      <StepHead
        index="03"
        total={6}
        kicker="GENESIS · SKILL FORGE"
        title="THE SHEET IS SEALED"
        blurb="The forge has read your dossier and applied the cast's overlay. These numbers cannot be edited — they are what the void believes about you now."
      />

      <HeaderStrip>
        <Left>
          <Badge>
            <Glyph type={arch.glyph} size={14} c="var(--bs-accent)" />
          </Badge>
          <div>
            <ArchName>{arch.name}</ArchName>
            <ArchSub>CAST · OVERLAY APPLIED</ArchSub>
          </div>
        </Left>
        <div style={{ textAlign: 'right' }}>
          <TotalLabel>POINT TOTAL</TotalLabel>
          <TotalValue>{total}</TotalValue>
        </div>
      </HeaderStrip>

      <Columns>
        <div>
          <GroupLabel>· FLIGHT</GroupLabel>
          {flight.map((sk, i) => (
            <SkillBar key={sk.key} sk={sk} idx={i} reveal={reveal} />
          ))}
          <GroupLabel $top>· TECH</GroupLabel>
          {tech.map((sk, i) => (
            <SkillBar key={sk.key} sk={sk} idx={i + flight.length} reveal={reveal} />
          ))}
        </div>
        <div>
          <GroupLabel>· SOUL</GroupLabel>
          {soul.map((sk, i) => (
            <SkillBar key={sk.key} sk={sk} idx={i + flight.length + tech.length} reveal={reveal} />
          ))}

          {ceiling && (
            <ModPanel className="bs-pop">
              <ModHead>
                <Glyph type="diamond" size={12} c="var(--bs-accent)" /> AGENT MODERATION FLAG
              </ModHead>
              <ModBody>
                {ceiling.label} cleared the 13-threshold. The forge has held the read;
                you&apos;ll receive scrutiny review on first commission — not a strike,
                just a notice.
              </ModBody>
            </ModPanel>
          )}
        </div>
      </Columns>

      <Disclaimer>
        // skills are inferred from cast + dossier. the agent&apos;s heuristic is
        sealed. revising the bio re-seals a new sheet.
      </Disclaimer>

      <NavRow onBack={onBack} backLabel="← REVISE DOSSIER">
        <GlowButton kind="t" onClick={onNext}>
          ACCEPT &amp; CONTINUE →
        </GlowButton>
      </NavRow>
    </Fragment>
  );
};

export default ForgeStep;
