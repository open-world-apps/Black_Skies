'use client';

import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import CornerFrame from 'ui/atoms/layout/CornerFrame';
import { useOverlayLock } from '@/lib/intake/overlayState';

interface BioAnalyzingModalProps {
  onDone: () => void;
  durationMs?: number;
}

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 5, 9, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const Modal = styled.div`
  width: 440px;
  max-width: 90%;
`;

const Panel = styled.div`
  border: 1px solid rgba(232, 147, 47, 0.35);
  background: rgba(8, 10, 16, 0.94);
  padding: 34px 30px;
  box-shadow: 0 0 60px -10px rgba(232, 147, 47, 0.35);
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Pulse = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--bs-accent);
  box-shadow: 0 0 14px var(--bs-accent);
`;

const Title = styled.div`
  font-family: var(--bs-display);
  font-size: 16px;
  letter-spacing: 0.18em;
  color: #fff;
  font-weight: 700;
`;

const Log = styled.div`
  border-top: 1px solid var(--bs-line);
  margin-top: 18px;
  padding-top: 16px;
  min-height: 132px;
`;

const Line = styled.div<{ $active: boolean }>`
  font-family: var(--bs-mono);
  font-size: 11px;
  line-height: 1.85;
  color: ${({ $active }) => ($active ? 'var(--bs-ink)' : 'var(--bs-ink-dim)')};
`;

const Caret = styled.span`
  color: var(--bs-accent);
`;

const Footnote = styled.div`
  font-family: var(--bs-mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  color: var(--bs-ink-dim);
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px dashed var(--bs-line);
`;

const LINES = [
  'parsing dossier · 1,824 tokens',
  'cross-checking against registry temperament priors',
  'weighing physical aptitude vs declared scars',
  'calibrating archetype overlay',
  'sealing skill sheet — agent disclaimer pinned',
];

const BioAnalyzingModal: FC<BioAnalyzingModalProps> = ({ onDone, durationMs = 2200 }) => {
  const [n, setN] = useState(0);
  useOverlayLock();

  useEffect(() => {
    const each = durationMs / LINES.length;
    const ids = LINES.map((_, i) => setTimeout(() => setN(i + 1), each * (i + 1)));
    const done = setTimeout(onDone, durationMs + 350);
    return () => {
      ids.forEach(clearTimeout);
      clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Backdrop>
      <Modal className="bs-pop">
        <CornerFrame color="var(--bs-accent)" len={18}>
          <Panel>
            <Head>
              <Pulse className="bs-blink" />
              <Title>FORGE · ANALYZING DOSSIER</Title>
            </Head>
            <Log>
              {LINES.slice(0, n).map((l, i) => (
                <Line key={i} className="bs-pop" $active={i === n - 1}>
                  <Caret>›</Caret> {l}
                  {i === n - 1 && <span className="bs-blink">_</span>}
                </Line>
              ))}
            </Log>
            <Footnote>
              // the agent&apos;s methods are sealed. you&apos;ll see the result, not
              the math.
            </Footnote>
          </Panel>
        </CornerFrame>
      </Modal>
    </Backdrop>
  );
};

export default BioAnalyzingModal;
