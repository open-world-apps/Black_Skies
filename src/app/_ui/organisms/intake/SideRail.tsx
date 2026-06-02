'use client';

import { FC, Fragment, ReactNode } from 'react';
import styled from 'styled-components';

import EyebrowBase from 'ui/atoms/text/Eyebrow';
import Brand from 'ui/molecules/landing/Brand';
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

const Eyebrow = styled(EyebrowBase)`
  font-size: 10px;
  letter-spacing: 0.26em;
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

const SideRail = ({ stepIndex, online, genesisSlot }: SideRailProps) => (
  <Aside>
    <Brand />
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
