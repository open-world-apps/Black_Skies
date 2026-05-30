'use client';

import { FC } from 'react';
import styled from 'styled-components';

import Glyph from 'ui/atoms/intake/Glyph';
import { Faction } from '@/lib/intake/types';

interface FactionCardProps {
  f: Faction;
  selected: boolean;
  onToggle: () => void;
}

const Card = styled.button<{ $selected: boolean; $accent: string; $tint: string }>`
  text-align: left;
  cursor: pointer;
  padding: 16px 18px;
  position: relative;
  transition: all 0.18s;
  background: ${({ $selected, $tint }) => ($selected ? $tint : 'rgba(8, 10, 16, 0.5)')};
  border: 1px solid ${({ $selected, $accent }) => ($selected ? $accent : 'var(--bs-line)')};
  box-shadow: ${({ $selected, $accent }) =>
    $selected ? `0 0 18px -6px ${$accent}` : 'none'};
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const Badge = styled.span<{ $selected: boolean; $accent: string }>`
  width: 32px;
  height: 32px;
  border: 1px solid ${({ $selected, $accent }) => ($selected ? $accent : 'var(--bs-line)')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const Name = styled.div`
  font-family: var(--bs-display);
  font-size: 15px;
  letter-spacing: 0.14em;
  color: #fff;
  font-weight: 700;
`;

const Blurb = styled.div`
  font-family: var(--bs-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--bs-ink-dim);
  margin-top: 2px;
`;

const Accepted = styled.span<{ $accent: string }>`
  font-family: var(--bs-mono);
  font-size: 9px;
  letter-spacing: 0.18em;
  color: ${({ $accent }) => $accent};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding-top: 10px;
  border-top: 1px solid var(--bs-line);
`;

const PerkLabel = styled.div`
  font-family: var(--bs-mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--bs-accent2);
  margin-bottom: 4px;
`;

const CostLabel = styled.div`
  font-family: var(--bs-mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: #c87363;
  margin-bottom: 4px;
`;

const PerkText = styled.div`
  font-family: var(--bs-mono);
  font-size: 11px;
  line-height: 1.45;
  color: var(--bs-ink);
`;

const CostText = styled.div`
  font-family: var(--bs-mono);
  font-size: 11px;
  line-height: 1.45;
  color: var(--bs-ink-dim);
`;

const InvitedBy = styled.div`
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px dashed var(--bs-line);
  font-family: var(--bs-mono);
  font-size: 9.5px;
  letter-spacing: 0.12em;
  color: var(--bs-ink-dim);
`;

const FactionCard: FC<FactionCardProps> = ({ f, selected, onToggle }) => {
  const accent = f.accent === 'a' ? 'var(--bs-accent)' : 'var(--bs-accent2)';
  const tint = f.accent === 'a' ? 'rgba(232, 147, 47, 0.06)' : 'rgba(63, 185, 201, 0.05)';
  return (
    <Card type="button" onClick={onToggle} $selected={selected} $accent={accent} $tint={tint}>
      <Head>
        <Badge $selected={selected} $accent={accent}>
          <Glyph type={f.glyph} size={15} c={selected ? accent : 'var(--bs-ink)'} />
        </Badge>
        <div style={{ flex: 1 }}>
          <Name>{f.name}</Name>
          <Blurb>{f.blurb}</Blurb>
        </div>
        {selected && <Accepted $accent={accent}>ACCEPTED ✓</Accepted>}
      </Head>
      <Grid>
        <div>
          <PerkLabel>+ PERK</PerkLabel>
          <PerkText>{f.perk}</PerkText>
        </div>
        <div>
          <CostLabel>− COST</CostLabel>
          <CostText>{f.cost}</CostText>
        </div>
      </Grid>
      <InvitedBy>// {f.invitedBy}</InvitedBy>
    </Card>
  );
};

export default FactionCard;
