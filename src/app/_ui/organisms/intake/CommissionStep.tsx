'use client';

import { FC, Fragment, useMemo } from 'react';
import styled from 'styled-components';

import StepHead from 'ui/atoms/intake/StepHead';
import GlowButton from 'ui/atoms/intake/GlowButton';
import Glyph from 'ui/atoms/intake/Glyph';
import CornerFrame from 'ui/atoms/intake/CornerFrame';
import { TextButton } from 'ui/atoms/intake/NavRow';
import DossierRow from 'ui/molecules/intake/DossierRow';
import { validators, scoreKey } from '@/lib/intake/validators';
import {
  ARCHETYPES,
  FACTIONS,
  SPAWN_NODES,
  TRAIT_PAIRS,
  factionHomeNode,
} from '@/lib/intake/genesis';
import { STEPS } from '@/lib/intake/steps';
import { GenesisData, IntakeForm } from '@/lib/intake/types';

interface CommissionStepProps {
  form: IntakeForm;
  genesis: GenesisData;
  minAge: number;
  onBack: () => void;
  onRestart: () => void;
  onAbort: () => void;
  onConfirm: () => void;
}

const Card = styled.div`
  border: 1px solid var(--bs-line);
  background: rgba(8, 10, 16, 0.6);
  padding: 24px 26px;
`;

const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--bs-line);
  padding-bottom: 16px;
  margin-bottom: 6px;
`;

const HeadLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PilotName = styled.div`
  font-family: var(--bs-display);
  font-size: 20px;
  letter-spacing: 0.06em;
  color: #fff;
  font-weight: 700;
`;

const PilotSub = styled.div`
  font-family: var(--bs-mono);
  font-size: 9.5px;
  letter-spacing: 0.18em;
  color: var(--bs-ink-dim);
  margin-top: 3px;
`;

const RegBlock = styled.div`
  text-align: right;
`;

const RegLabel = styled.div`
  font-family: var(--bs-mono);
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--bs-ink-dim);
`;

const RegId = styled.div`
  font-family: var(--bs-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--bs-accent2);
  margin-top: 3px;
`;

const SectionLabel = styled.div`
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px dashed var(--bs-line);
  font-family: var(--bs-mono);
  font-size: 9.5px;
  letter-spacing: 0.22em;
  color: var(--bs-accent);
`;

const TraitTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 14px;
`;

const TraitTag = styled.span<{ $locked: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--bs-mono);
  font-size: 9.5px;
  letter-spacing: 0.1em;
  color: ${({ $locked }) => ($locked ? 'var(--bs-accent2)' : 'var(--bs-ink)')};
  padding: 3px 8px;
  border: 1px solid
    ${({ $locked }) => ($locked ? 'rgba(63, 185, 201, 0.4)' : 'var(--bs-line)')};
`;

const Warning = styled.div`
  display: flex;
  gap: 14px;
  border: 1px solid rgba(232, 147, 47, 0.4);
  background: rgba(232, 147, 47, 0.06);
  padding: 16px 18px;
  margin-top: 22px;
`;

const WarnIcon = styled.div`
  flex-shrink: 0;
  padding-top: 1px;
`;

const WarnTitle = styled.div`
  font-family: var(--bs-display);
  font-size: 13px;
  letter-spacing: 0.14em;
  color: var(--bs-accent);
  font-weight: 700;
`;

const WarnBody = styled.p`
  font-family: var(--bs-mono);
  font-size: 11.5px;
  line-height: 1.65;
  color: var(--bs-ink-dim);
  margin: 8px 0 0;
`;

const Ink = styled.span`
  color: var(--bs-ink);
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  gap: 16px;
  flex-wrap: wrap;
`;

const FooterLeft = styled.div`
  display: flex;
  gap: 18px;
`;

const CancelButton = styled(TextButton)`
  color: #a85a4d;
`;

const CommissionStep: FC<CommissionStepProps> = ({
  form,
  genesis,
  minAge,
  onBack,
  onRestart,
  onAbort,
  onConfirm,
}) => {
  const dob = validators.dob(form.dob, minAge);
  const key = scoreKey(form.accessKey);

  const maskedMail = (() => {
    const [u, d] = (form.email || '').split('@');
    if (!u || !d) return form.email;
    return u.slice(0, 2) + '•••@' + d;
  })();

  // Display-only stamp; the persisted registryId is generated server-side.
  const stamp = useMemo(
    () =>
      'BS-' +
      (form.displayName || 'PILOT')
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .slice(0, 6)
        .padEnd(4, 'X') +
      '-' +
      String(Math.floor(Math.random() * 9000) + 1000),
    [form.displayName]
  );

  const arch = ARCHETYPES.find(a => a.key === genesis.archetype);
  const fac = FACTIONS.find(f => f.key === genesis.allegiance);
  const homeNode = fac ? factionHomeNode(fac.key) : null;
  const allNodes = homeNode ? [homeNode, ...SPAWN_NODES] : SPAWN_NODES;
  const spawnNode = allNodes.find(n => n.key === genesis.spawn);
  const sheet = genesis.sheet || [];
  const top3 = [...sheet].sort((a, b) => b.total - a.total).slice(0, 3);
  const allTraits = [...(genesis.lockedTraits || []), ...(genesis.pickedTraits || [])]
    .map(k => TRAIT_PAIRS.find(p => p.key === k))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <Fragment>
      <StepHead
        index="04"
        total={STEPS.length}
        kicker="COMMISSION"
        title="REVIEW YOUR DOSSIER"
        blurb="This is the record the sector will hold on you. Confirm every line — once commissioned, your identity is sealed against the universe."
      />

      <CornerFrame color="var(--bs-accent)" len={18}>
        <Card>
          <CardHead>
            <HeadLeft>
              <Glyph type={arch ? arch.glyph : 'node'} size={22} c="var(--bs-accent)" />
              <div>
                <PilotName>{form.displayName || '—'}</PilotName>
                <PilotSub>
                  {arch ? arch.name : 'UNFORGED'} · {genesis.pilotName || 'NAMELESS'}
                </PilotSub>
              </div>
            </HeadLeft>
            <RegBlock>
              <RegLabel>REGISTRY ID</RegLabel>
              <RegId>{stamp}</RegId>
            </RegBlock>
          </CardHead>

          <DossierRow label="COMMS ADDRESS" value={maskedMail} />
          <DossierRow label="REGION OF ORIGIN" value={form.country || '—'} />
          <DossierRow
            label="AGE VERIFICATION"
            value={dob.age != null ? `${dob.age} CYCLES · CLEARED ✓` : '—'}
            accent="var(--bs-accent2)"
          />
          <DossierRow
            label="ACCESS KEY"
            value={`${'•'.repeat(Math.min(12, (form.accessKey || '').length))}  ·  ${key.label}`}
            accent={key.score >= 3 ? 'var(--bs-accent2)' : 'var(--bs-ink)'}
          />
          <DossierRow
            label="PILOT COMPACT"
            value={form.agreedTerms ? 'ACCEPTED ✓' : 'NOT ACCEPTED'}
            accent={form.agreedTerms ? 'var(--bs-accent2)' : '#e06a55'}
          />

          <SectionLabel>· GENESIS RECORD</SectionLabel>
          <DossierRow label="ARCHETYPE" value={arch ? arch.name : '—'} accent="var(--bs-accent)" />
          <DossierRow label="IN-GAME NAME" value={genesis.pilotName || '—'} mono={false} />
          <DossierRow label="AGE · CYCLES" value={genesis.age ? `${genesis.age}` : '—'} />
          <DossierRow
            label="TOP DISCIPLINES"
            value={top3.length ? top3.map(s => `${s.label} ${s.total}`).join(' · ') : '—'}
            accent="var(--bs-accent2)"
          />
          <DossierRow label="TRAITS" value={allTraits.length ? `${allTraits.length} BOUND` : '—'} />
          <DossierRow
            label="ALLEGIANCE"
            value={fac ? fac.name : 'UNALIGNED'}
            accent={
              fac
                ? fac.accent === 'a'
                  ? 'var(--bs-accent)'
                  : 'var(--bs-accent2)'
                : 'var(--bs-ink-dim)'
            }
          />
          <DossierRow
            label="SPAWN POINT"
            value={spawnNode ? spawnNode.label : '—'}
            accent="var(--bs-accent2)"
          />

          {allTraits.length > 0 && (
            <TraitTags>
              {allTraits.map(p => {
                const isLocked = (genesis.lockedTraits || []).includes(p.key);
                return (
                  <TraitTag key={p.key} $locked={isLocked}>
                    <span style={{ color: 'var(--bs-accent2)' }}>+</span>
                    {p.strong} <span style={{ color: '#c87363' }}>∕ −</span>
                    {p.weak}
                  </TraitTag>
                );
              })}
            </TraitTags>
          )}
        </Card>
      </CornerFrame>

      <Warning>
        <WarnIcon>
          <Glyph type="diamond" size={16} c="var(--bs-accent)" />
        </WarnIcon>
        <div>
          <WarnTitle>IDENTITY SEALS ON COMMISSION</WarnTitle>
          <WarnBody>
            Confirm and your pilot record locks. Callsign, origin and clearance{' '}
            <Ink>cannot be altered</Ink> outside sanctioned in-game events. This is
            the last threshold where your will is your own — past it, the void
            decides.
          </WarnBody>
        </div>
      </Warning>

      <Footer>
        <FooterLeft>
          <TextButton type="button" onClick={onBack}>
            ← BACK
          </TextButton>
          <TextButton type="button" onClick={onRestart}>
            ↺ START OVER
          </TextButton>
          <CancelButton type="button" onClick={onAbort}>
            ✕ CANCEL
          </CancelButton>
        </FooterLeft>
        <GlowButton onClick={onConfirm}>✓ CONFIRM &amp; COMMISSION</GlowButton>
      </Footer>
    </Fragment>
  );
};

export default CommissionStep;
