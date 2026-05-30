'use client';

import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import CornerFrame from 'ui/atoms/intake/CornerFrame';
import Glyph from 'ui/atoms/intake/Glyph';
import GlowButton from 'ui/atoms/intake/GlowButton';
import { WORLD } from '@/lib/intake/data';
import { useOverlayLock } from '@/lib/intake/overlayState';

interface GrantedModalProps {
  displayName: string;
  onEnter: () => void;
}

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 5, 9, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const Modal = styled.div`
  width: 460px;
  max-width: 90%;
`;

const Panel = styled.div`
  border: 1px solid rgba(63, 185, 201, 0.4);
  background: rgba(8, 10, 16, 0.92);
  padding: 38px 38px 34px;
  box-shadow: 0 0 80px -10px rgba(63, 185, 201, 0.4);
  text-align: center;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid var(--bs-accent2);
  box-shadow: 0 0 30px -4px var(--bs-accent2);
`;

const Title = styled.div`
  font-family: var(--bs-display);
  font-size: 24px;
  letter-spacing: 0.1em;
  color: #fff;
  margin-top: 22px;
  font-weight: 700;
`;

const SubTitle = styled.div`
  font-family: var(--bs-mono);
  font-size: 12px;
  letter-spacing: 0.24em;
  color: var(--bs-accent2);
  margin-top: 8px;
`;

const Log = styled.div`
  text-align: left;
  border-top: 1px solid var(--bs-line);
  margin-top: 24px;
  padding-top: 18px;
  min-height: 78px;
`;

const LogLine = styled.div<{ $active: boolean }>`
  font-family: var(--bs-mono);
  font-size: 11px;
  line-height: 1.9;
  color: ${({ $active }) => ($active ? 'var(--bs-ink)' : 'var(--bs-ink-dim)')};
`;

const Caret = styled.span`
  color: var(--bs-accent2);
`;

const Welcome = styled.div`
  font-family: var(--bs-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--bs-ink-dim);
  margin-top: 4px;
  margin-bottom: 22px;
`;

const Name = styled.span`
  color: var(--bs-accent);
`;

const GrantedModal: FC<GrantedModalProps> = ({ displayName, onEnter }) => {
  const lines = [
    'negotiating handshake with ' + WORLD.node + '…',
    'dossier sealed · registry write committed',
    'syncing empire · arming nerve · routing convoy',
  ];
  const [n, setN] = useState(0);
  const [enter, setEnter] = useState(false);
  useOverlayLock();

  useEffect(() => {
    const ids = lines.map((_, i) =>
      setTimeout(() => setN(i + 1), 600 + i * 700)
    );
    const e = setTimeout(() => setEnter(true), 600 + lines.length * 700 + 300);
    return () => {
      ids.forEach(clearTimeout);
      clearTimeout(e);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Backdrop>
      <Modal className="bs-pop">
        <CornerFrame color="var(--bs-accent2)" len={20}>
          <Panel>
            <Badge>
              <Glyph type="node" size={30} c="var(--bs-accent2)" />
            </Badge>
            <Title>CONNECTION ESTABLISHED</Title>
            <SubTitle>ACCESS GRANTED</SubTitle>
            <Log>
              {lines.slice(0, n).map((l, i) => (
                <LogLine key={i} className="bs-pop" $active={i === n - 1}>
                  <Caret>›</Caret> {l}
                  {i === n - 1 && !enter && <span className="bs-blink">_</span>}
                </LogLine>
              ))}
            </Log>
            <Welcome>
              welcome to the black skies, <Name>{displayName || 'pilot'}</Name>.
            </Welcome>
            <GlowButton kind="t" wide disabled={!enter} onClick={onEnter}>
              {enter ? '↵ ENTER THE VOID' : 'STAND BY…'}
            </GlowButton>
          </Panel>
        </CornerFrame>
      </Modal>
    </Backdrop>
  );
};

export default GrantedModal;
