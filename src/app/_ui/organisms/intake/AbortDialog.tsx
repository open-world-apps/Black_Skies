'use client';

import { FC } from 'react';
import styled from 'styled-components';

import CornerFrame from 'ui/atoms/layout/CornerFrame';
import Glyph from 'ui/atoms/icons/Glyph';
import { useOverlayLock } from '@/lib/intake/overlayState';

interface AbortDialogProps {
  onClose: () => void;
  onConfirm: () => void;
}

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 5, 9, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const Modal = styled.div`
  width: 400px;
  max-width: 90%;
`;

const Panel = styled.div`
  border: 1px solid rgba(216, 83, 63, 0.4);
  background: rgba(8, 10, 16, 0.94);
  padding: 30px 30px 26px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--bs-display);
  font-size: 17px;
  letter-spacing: 0.1em;
  color: #e06a55;
  font-weight: 700;
`;

const Body = styled.p`
  font-family: var(--bs-mono);
  font-size: 12px;
  line-height: 1.65;
  color: var(--bs-ink-dim);
  margin: 14px 0 24px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const KeepButton = styled.button`
  background: none;
  border: 1px solid var(--bs-line);
  cursor: pointer;
  font-family: var(--bs-mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--bs-ink);
  padding: 11px 18px;
  border-radius: 2px;
`;

const PurgeButton = styled.button`
  background: rgba(216, 83, 63, 0.14);
  border: 1px solid rgba(216, 83, 63, 0.5);
  cursor: pointer;
  font-family: var(--bs-mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  color: #e06a55;
  padding: 11px 18px;
  border-radius: 2px;
`;

const AbortDialog: FC<AbortDialogProps> = ({ onClose, onConfirm }) => {
  useOverlayLock();
  return (
    <Backdrop>
    <Modal className="bs-pop">
      <CornerFrame color="rgba(216, 83, 63, 0.5)" len={16}>
        <Panel>
          <Title>
            <Glyph type="cross" size={16} c="#e06a55" /> ABORT INTAKE?
          </Title>
          <Body>
            All intake progress will be purged. No dossier is written and your
            callsign returns to the open pool. There is no undo out here.
          </Body>
          <Actions>
            <KeepButton type="button" onClick={onClose}>
              ← KEEP GOING
            </KeepButton>
            <PurgeButton type="button" onClick={onConfirm}>
              PURGE &amp; EXIT
            </PurgeButton>
          </Actions>
        </Panel>
      </CornerFrame>
    </Modal>
    </Backdrop>
  );
};

export default AbortDialog;
