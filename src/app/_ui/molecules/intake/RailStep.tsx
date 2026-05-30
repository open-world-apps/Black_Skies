'use client';

import { FC } from 'react';
import styled from 'styled-components';

import Glyph from 'ui/atoms/intake/Glyph';

export type RailStatus = 'done' | 'active' | 'upcoming' | 'locked';

interface RailStepProps {
  index: string;
  label: string;
  sub: string;
  status: RailStatus;
  last?: boolean;
}

const Row = styled.div`
  display: flex;
  gap: 16px;
  position: relative;
`;

const Marker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Node = styled.div<{ $ring: string; $active: boolean }>`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid ${({ $ring }) => $ring};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $active }) =>
    $active ? 'rgba(232, 147, 47, 0.1)' : 'transparent'};
  box-shadow: ${({ $active }) =>
    $active ? '0 0 16px -4px var(--bs-accent)' : 'none'};
  transition: all 0.3s;
`;

const NodeNum = styled.span<{ $active: boolean }>`
  font-family: var(--bs-mono);
  font-size: 12px;
  color: ${({ $active }) => ($active ? 'var(--bs-accent)' : 'var(--bs-ink-dim)')};
`;

const Tick = styled.span`
  color: var(--bs-accent2);
  font-size: 13px;
`;

const Connector = styled.div<{ $done: boolean }>`
  width: 1px;
  flex: 1;
  min-height: 30px;
  background: ${({ $done }) => ($done ? 'var(--bs-accent2)' : 'var(--bs-line)')};
  opacity: ${({ $done }) => ($done ? 0.5 : 1)};
  transition: all 0.3s;
`;

const Body = styled.div`
  padding-top: 4px;
  padding-bottom: 22px;
`;

const Title = styled.div<{ $ink: string; $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--bs-display);
  font-size: 14px;
  letter-spacing: 0.14em;
  color: ${({ $ink }) => $ink};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
`;

const Sealed = styled.span`
  font-family: var(--bs-mono);
  font-size: 8.5px;
  letter-spacing: 0.12em;
  color: var(--bs-ink-dim);
  border: 1px solid var(--bs-line);
  padding: 2px 5px;
`;

const Sub = styled.div`
  font-family: var(--bs-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--bs-ink-dim);
  margin-top: 4px;
  line-height: 1.4;
`;

const RailStep: FC<RailStepProps> = ({ index, label, sub, status, last }) => {
  const ring =
    status === 'done'
      ? 'var(--bs-accent2)'
      : status === 'active'
        ? 'var(--bs-accent)'
        : 'var(--bs-line)';
  const ink =
    status === 'upcoming' || status === 'locked'
      ? 'var(--bs-ink-dim)'
      : 'var(--bs-ink)';

  return (
    <Row>
      <Marker>
        <Node $ring={ring} $active={status === 'active'}>
          {status === 'done' ? (
            <Tick>✓</Tick>
          ) : status === 'locked' ? (
            <Glyph type="ring" size={11} c="var(--bs-ink-dim)" />
          ) : (
            <NodeNum $active={status === 'active'}>{index}</NodeNum>
          )}
        </Node>
        {!last && <Connector $done={status === 'done'} />}
      </Marker>
      <Body>
        <Title $ink={ink} $active={status === 'active'}>
          {label}
          {status === 'locked' && <Sealed>SEALED</Sealed>}
        </Title>
        <Sub>{sub}</Sub>
      </Body>
    </Row>
  );
};

export default RailStep;
