'use client';

import { FC, Fragment, useEffect } from 'react';
import styled from 'styled-components';

import StepHead from 'ui/molecules/intake/StepHead';
import NavRow from 'ui/molecules/layout/NavRow';
import GlowButton from 'ui/atoms/buttons/GlowButton';
import StarMap from 'ui/molecules/intake/StarMap';
import RiskPips from 'ui/atoms/display/RiskPips';
import { SPAWN_NODES, factionHomeNode } from '@/lib/intake/genesis';

interface SpawnStepProps {
  allegiance: string | null;
  value: string | null;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const Readout = styled.div`
  margin-top: 14px;
  padding: 16px 18px;
  border: 1px solid var(--bs-line);
  background: rgba(8, 10, 16, 0.6);
  min-height: 168px;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const Label = styled.div`
  font-family: var(--bs-display);
  font-size: 16px;
  letter-spacing: 0.1em;
  color: #fff;
  font-weight: 700;
`;

const HomeTag = styled.span<{ $accent: string }>`
  margin-left: 10px;
  font-family: var(--bs-mono);
  font-size: 9px;
  letter-spacing: 0.16em;
  color: ${({ $accent }) => $accent};
  border: 1px solid ${({ $accent }) => $accent};
  padding: 2px 6px;
`;

const Kind = styled.div`
  font-family: var(--bs-mono);
  font-size: 9.5px;
  letter-spacing: 0.18em;
  color: var(--bs-ink-dim);
  margin-top: 3px;
`;

const RiskBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const RiskLabel = styled.div`
  font-family: var(--bs-mono);
  font-size: 9px;
  letter-spacing: 0.18em;
  color: var(--bs-ink-dim);
`;

const Blurb = styled.p`
  font-family: var(--bs-mono);
  font-size: 11.5px;
  line-height: 1.55;
  color: var(--bs-ink-dim);
  margin: 10px 0 12px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  padding-top: 10px;
  border-top: 1px solid var(--bs-line);
`;

const PerkLabel = styled.div`
  font-family: var(--bs-mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--bs-accent2);
  margin-bottom: 5px;
`;

const DangerLabel = styled.div`
  font-family: var(--bs-mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: #c87363;
  margin-bottom: 5px;
`;

const PerkItem = styled.div`
  font-family: var(--bs-mono);
  font-size: 10.5px;
  line-height: 1.5;
  color: var(--bs-ink);
  margin-bottom: 3px;
`;

const DangerItem = styled.div`
  font-family: var(--bs-mono);
  font-size: 10.5px;
  line-height: 1.5;
  color: var(--bs-ink-dim);
  margin-bottom: 3px;
`;

const Empty = styled.div`
  font-family: var(--bs-mono);
  font-size: 11px;
  color: var(--bs-ink-dim);
  letter-spacing: 0.08em;
`;

const SpawnStep: FC<SpawnStepProps> = ({ allegiance, value, onChange, onNext, onBack }) => {
  const home = allegiance ? factionHomeNode(allegiance) : null;
  const nodes = home ? [home, ...SPAWN_NODES] : SPAWN_NODES;
  const sel = nodes.find(n => n.key === value) || null;

  useEffect(() => {
    if (!value) onChange(home ? home.key : 'terminus_07');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <StepHead
        index="06"
        total={6}
        kicker="GENESIS · SPAWN POINT"
        title="WHERE THE VOID FIRST SEES YOU"
        blurb="Pick the corner of the chart you wake on. Every node has a different appetite — sanctuary at one end, the certainty of being hunted at the other."
      />

      <StarMap nodes={nodes} selectedKey={value} onSelect={onChange} />

      <Readout>
        {sel ? (
          <Fragment>
            <Head>
              <div>
                <Label>
                  {sel.label}
                  {sel.home && (
                    <HomeTag $accent={sel.accent === 'a' ? 'var(--bs-accent)' : 'var(--bs-accent2)'}>
                      FACTION HOME
                    </HomeTag>
                  )}
                </Label>
                <Kind>{sel.kind}</Kind>
              </div>
              <RiskBlock>
                <RiskLabel>RISK</RiskLabel>
                <RiskPips n={sel.risk} />
              </RiskBlock>
            </Head>
            <Blurb>{sel.blurb}</Blurb>
            <Grid>
              <div>
                <PerkLabel>+ PERKS</PerkLabel>
                {sel.perks.map((p, i) => (
                  <PerkItem key={i}>· {p}</PerkItem>
                ))}
              </div>
              <div>
                <DangerLabel>− DANGERS</DangerLabel>
                {sel.dangers.map((p, i) => (
                  <DangerItem key={i}>· {p}</DangerItem>
                ))}
              </div>
            </Grid>
          </Fragment>
        ) : (
          <Empty>// tap a node to read its file</Empty>
        )}
      </Readout>

      <NavRow onBack={onBack}>
        <GlowButton kind="t" onClick={onNext} disabled={!sel}>
          SEAL GENESIS →
        </GlowButton>
      </NavRow>
    </Fragment>
  );
};

export default SpawnStep;
