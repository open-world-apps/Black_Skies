'use client';

import { FC, Fragment } from 'react';
import styled from 'styled-components';

import StepHead from 'ui/molecules/intake/StepHead';
import ValField from 'ui/molecules/forms/ValField';
import SelectField from 'ui/molecules/forms/SelectField';
import NavRow from 'ui/molecules/layout/NavRow';
import GlowButton from 'ui/atoms/buttons/GlowButton';
import { validators } from '@/lib/intake/validators';
import { COUNTRIES } from '@/lib/intake/data';
import { IntakeForm } from '@/lib/intake/types';

interface IdentityStepProps {
  form: IntakeForm;
  set: <K extends keyof IntakeForm>(k: K, v: IntakeForm[K]) => void;
  touched: Record<string, boolean>;
  touch: (k: string) => void;
  onNext: () => void;
  onAbort: () => void;
}

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const IdentityStep: FC<IdentityStepProps> = ({
  form,
  set,
  touched,
  touch,
  onNext,
  onAbort,
}) => {
  const eName = validators.displayName(form.displayName);
  const eMail = validators.email(form.email);
  const eCountry = validators.country(form.country);
  const ready = !eName && !eMail && !eCountry;

  const go = () => {
    touch('displayName');
    touch('email');
    touch('country');
    if (ready) onNext();
  };

  return (
    <Fragment>
      <StepHead
        index="01"
        kicker="REGISTRY INTAKE"
        title="DECLARE YOURSELF"
        blurb="Every pilot logged into Black Skies carries one callsign and one comms channel. Choose carefully — the registry does not forget, and neither do your enemies."
      />
      <Fields>
        <ValField
          label="CALLSIGN"
          value={form.displayName}
          onChange={v => set('displayName', v)}
          placeholder="how the sector will know you"
          hint="3–18 · A–Z 0–9 _"
          autoFocus
          touched={touched.displayName}
          onBlur={() => touch('displayName')}
          error={eName}
          valid={!eName}
        />
        <ValField
          label="COMMS ADDRESS"
          value={form.email}
          onChange={v => set('email', v)}
          type="email"
          placeholder="pilot@domain.net"
          hint="account recovery"
          touched={touched.email}
          onBlur={() => touch('email')}
          error={eMail}
          valid={!eMail}
        />
        <SelectField
          label="REGION OF ORIGIN"
          value={form.country}
          onChange={v => set('country', v)}
          options={COUNTRIES}
          placeholder="declare jurisdiction…"
          touched={touched.country}
          onBlur={() => touch('country')}
          error={eCountry}
        />
      </Fields>
      <NavRow onBack={onAbort} backLabel="✕ ABORT INTAKE">
        <GlowButton onClick={go}>CONTINUE →</GlowButton>
      </NavRow>
    </Fragment>
  );
};

export default IdentityStep;
