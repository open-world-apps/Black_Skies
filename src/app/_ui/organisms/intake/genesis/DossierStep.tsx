'use client';

import { FC, Fragment } from 'react';
import styled from 'styled-components';

import StepHead from 'ui/atoms/intake/StepHead';
import ValField from 'ui/atoms/intake/ValField';
import TextArea from 'ui/atoms/intake/TextArea';
import NavRow from 'ui/atoms/intake/NavRow';
import GlowButton from 'ui/atoms/intake/GlowButton';
import { GenesisData } from '@/lib/intake/types';

interface DossierStepProps {
  form: GenesisData;
  set: <K extends keyof GenesisData>(k: K, v: GenesisData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const RowWide = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 14px;
`;

const RowEven = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

const Unit = styled.span`
  font-family: var(--bs-mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  color: var(--bs-ink-dim);
  padding-right: 2px;
`;

const DossierStep: FC<DossierStepProps> = ({ form, set, onNext, onBack }) => {
  const h = +form.height;
  const w = +form.weight;
  const heightOk = h >= 120 && h <= 240;
  const weightOk = w >= 30 && w <= 260;
  const ready =
    (form.pilotName || '').trim().length >= 2 &&
    +form.age >= 18 &&
    +form.age <= 120 &&
    heightOk &&
    weightOk &&
    (form.bio || '').trim().length >= 40;

  return (
    <Fragment>
      <StepHead
        index="02"
        total={6}
        kicker="GENESIS · DOSSIER"
        title="WRITE THE FLESH"
        blurb="The forge needs a body to hang the pilot on. The more honestly you describe what you carry — and what was done to you — the more accurately your sheet settles."
      />
      <Fields>
        <RowWide>
          <ValField
            label="PILOT NAME"
            value={form.pilotName}
            onChange={v => set('pilotName', v.slice(0, 40))}
            placeholder="the name on your manifests"
            hint="distinct from callsign"
            autoFocus
            touched
            valid={(form.pilotName || '').trim().length >= 2}
            error={null}
          />
          <ValField
            label="AGE · CYCLES"
            value={form.age}
            onChange={v => set('age', v.replace(/\D/g, '').slice(0, 3))}
            placeholder="32"
            hint="years carried"
            touched
            valid={+form.age >= 18 && +form.age <= 120}
            error={null}
          />
        </RowWide>
        <RowEven>
          <ValField
            label="HEIGHT"
            value={form.height}
            onChange={v => set('height', v.replace(/\D/g, '').slice(0, 3))}
            placeholder="182"
            hint="centimetres"
            touched
            valid={heightOk}
            error={null}
            suffix={<Unit>CM</Unit>}
          />
          <ValField
            label="MASS"
            value={form.weight}
            onChange={v => set('weight', v.replace(/\D/g, '').slice(0, 3))}
            placeholder="78"
            hint="kilograms"
            touched
            valid={weightOk}
            error={null}
            suffix={<Unit>KG</Unit>}
          />
        </RowEven>
        <TextArea
          label="MARKS · MODIFICATIONS"
          value={form.physical}
          onChange={v => set('physical', v)}
          placeholder="scars, burns, tattoos. augments, prosthetics, missing parts."
          hint="optional · for sensor profiles"
          maxLen={240}
          rows={3}
        />
        <TextArea
          label="BACKGROUND · BIOGRAPHY"
          value={form.bio}
          onChange={v => set('bio', v)}
          placeholder={
            'where you came from. what you ran from. who you owe.\nthe forge does not read kindly — but it reads everything.'
          }
          hint="40 chars minimum"
          maxLen={1400}
          rows={9}
        />
      </Fields>

      <NavRow onBack={onBack}>
        <GlowButton onClick={onNext} disabled={!ready}>
          {ready ? 'SUBMIT TO FORGE →' : 'COMPLETE DOSSIER'}
        </GlowButton>
      </NavRow>
    </Fragment>
  );
};

export default DossierStep;
