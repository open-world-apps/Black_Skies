'use client';

import { } from 'react';
import styled from 'styled-components';

interface StepHeadProps {
  index?: string;
  kicker: string;
  title: string;
  blurb?: string;
  total?: number;
}

const Wrap = styled.div`
  margin-bottom: 30px;
`;

const Kicker = styled.div`
  font-family: var(--bs-mono);
  font-size: 11px;
  letter-spacing: 0.34em;
  color: var(--bs-accent);
  margin-bottom: 14px;
`;

const Title = styled.h1`
  font-family: var(--bs-display);
  font-weight: 700;
  font-size: 40px;
  line-height: 1;
  letter-spacing: 0.01em;
  margin: 0;
  color: #f3f5f8;
`;

const Blurb = styled.p`
  font-family: var(--bs-mono);
  font-size: 13px;
  line-height: 1.6;
  letter-spacing: 0.02em;
  color: var(--bs-ink-dim);
  margin: 14px 0 0;
  max-width: 460px;
`;

const StepHead = ({ index, kicker, title, blurb, total }: StepHeadProps) => (
  <Wrap>
    <Kicker>
      {index
        ? `STEP ${index}${total ? ' / ' + String(total).padStart(2, '0') : ''} · `
        : ''}
      {kicker}
    </Kicker>
    <Title>{title}</Title>
    {blurb && <Blurb>{blurb}</Blurb>}
  </Wrap>
);

export default StepHead;
