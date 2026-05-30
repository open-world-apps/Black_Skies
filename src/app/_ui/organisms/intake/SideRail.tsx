'use client';

import { FC, Fragment, ReactNode } from 'react';
import styled from 'styled-components';

import Glyph from 'ui/atoms/intake/Glyph';
import RailStep, { RailStatus } from 'ui/molecules/intake/RailStep';
import { STEPS } from '@/lib/intake/steps';
import { WORLD, fmt } from '@/lib/intake/data';

interface SideRailProps {
  stepIndex: number;
  online: number;
  // Injected substep rail, rendered nested under the active genesis step.
  genesisSlot?: ReactNode;
}

const Aside = styled.aside`
  width: 320px;
  flex-shrink: 0;
  border-right: 1px solid var(--bs-line);
  background: rgba(7, 9, 14, 0.7);
  display: flex;
  flex-direction: column;
  padding: 40px 38px;
  position: relative;
  overflow-y: auto;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BrandName = styled.span`
  font-family: var(--bs-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: #f3f5f8;
`;

const Eyebrow = styled.div`
  font-family: var(--bs-mono);
  font-size: 10px;
  letter-spacing: 0.26em;
  color: var(--bs-accent);
  margin-top: 30px;
  margin-bottom: 6px;
`;

const Heading = styled.div`
  font-family: var(--bs-display);
  font-size: 22px;
  letter-spacing: 0.05em;
  color: var(--bs-ink);
  font-weight: 700;
  margin-bottom: 36px;
`;

const SubSlot = styled.div`
  margin-top: -12px;
  margin-bottom: 8px;
`;

const Footer = styled.div`
  margin-top: auto;
  padding-top: 30px;
  border-top: 1px solid var(--bs-line);
  display: flex;
  flex-direction: column;
  gap: 9px;
  font-family: var(--bs-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--bs-ink-dim);
`;

const FootRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Live = styled.span`
  color: var(--bs-accent2);
`;

const SideRail: FC<SideRailProps> = ({ stepIndex, online, genesisSlot }) => (
  <Aside>
    <Brand>
      <Glyph type="node" size={22} c="var(--bs-accent)" />
      <BrandName>BLACK&nbsp;SKIES</BrandName>
    </Brand>
    <Eyebrow>NEW PILOT</Eyebrow>
    <Heading>INTAKE SEQUENCE</Heading>

    <div>
      {STEPS.map((s, i) => {
        const status: RailStatus =
          i < stepIndex ? 'done' : i === stepIndex ? 'active' : 'upcoming';
        const node = (
          <RailStep
            index={String(i + 1).padStart(2, '0')}
            label={s.label}
            sub={s.sub}
            status={status}
            last={i === STEPS.length - 1}
          />
        );
        if (s.key === 'genesis' && stepIndex === i && genesisSlot) {
          return (
            <Fragment key={s.key}>
              {node}
              <SubSlot>{genesisSlot}</SubSlot>
            </Fragment>
          );
        }
        return <Fragment key={s.key}>{node}</Fragment>;
      })}
    </div>

    <Footer>
      <FootRow>
        <span>
          <Live>●</Live> {fmt(online)} ONLINE
        </span>
        <span>{WORLD.build}</span>
      </FootRow>
      <FootRow>
        <span>{WORLD.node}</span>
        <span>SECURE LINK</span>
      </FootRow>
    </Footer>
  </Aside>
);

export default SideRail;
