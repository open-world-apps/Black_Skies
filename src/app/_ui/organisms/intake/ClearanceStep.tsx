'use client';

import { FC, Fragment } from 'react';
import styled from 'styled-components';

import StepHead from 'ui/atoms/text/StepHead';
import ValField from 'ui/atoms/forms/ValField';
import DOBField from 'ui/atoms/forms/DOBField';
import CheckRow from 'ui/atoms/forms/CheckRow';
import StrengthMeter from 'ui/atoms/display/StrengthMeter';
import NavRow from 'ui/atoms/layout/NavRow';
import GlowButton from 'ui/atoms/buttons/GlowButton';
import Glyph from 'ui/atoms/icons/Glyph';
import { validators } from '@/lib/intake/validators';
import { IntakeForm } from '@/lib/intake/types';

interface ClearanceStepProps {
  form: IntakeForm;
  set: <K extends keyof IntakeForm>(k: K, v: IntakeForm[K]) => void;
  touched: Record<string, boolean>;
  touch: (k: string) => void;
  minAge: number;
  onNext: () => void;
  onBack: () => void;
}

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const KeyGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Gap = styled.div<{ $h: number }>`
  height: ${({ $h }) => $h}px;
`;

const Denied = styled.div`
  border: 1px solid rgba(216, 83, 63, 0.5);
  background: rgba(216, 83, 63, 0.08);
  padding: 14px 16px;
  margin-top: 2px;
`;

const DeniedHead = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--bs-display);
  font-size: 13px;
  letter-spacing: 0.16em;
  color: #e06a55;
  font-weight: 700;
`;

const DeniedBody = styled.p`
  font-family: var(--bs-mono);
  font-size: 11.5px;
  line-height: 1.6;
  color: #e0a99e;
  margin: 10px 0 0;
`;

const Underline = styled.span`
  color: var(--bs-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
`;

const Accent2 = styled.span`
  color: var(--bs-accent2);
`;

const ClearanceStep: FC<ClearanceStepProps> = ({
  form,
  set,
  touched,
  touch,
  minAge,
  onNext,
  onBack,
}) => {
  const eKey = validators.accessKey(form.accessKey);
  const dob = validators.dob(form.dob, minAge);
  const eTerms = form.agreedTerms
    ? null
    : 'you must accept the Pilot Compact to proceed';
  const ready = !eKey && dob.err === null && !eTerms;

  const go = () => {
    touch('accessKey');
    touch('dob');
    touch('agreedTerms');
    if (ready) onNext();
  };

  return (
    <Fragment>
      <StepHead
        index="02"
        kicker="SECURITY CLEARANCE"
        title="LOCK IT DOWN"
        blurb="Your access key is the only thing between your empire and a hostile takeover. We verify your age once — the black skies are no place for children."
      />
      <Fields>
        <KeyGroup>
          <ValField
            label="ACCESS KEY"
            value={form.accessKey}
            onChange={v => set('accessKey', v)}
            type="password"
            placeholder="••••••••••••"
            hint="12+ recommended"
            touched={touched.accessKey}
            onBlur={() => touch('accessKey')}
            error={eKey}
            valid={!eKey}
          />
          <StrengthMeter pw={form.accessKey} />
        </KeyGroup>
        <Gap $h={8} />
        <DOBField
          value={form.dob}
          onChange={v => set('dob', v)}
          result={dob}
          touched={touched.dob}
          onBlur={() => touch('dob')}
        />
        {touched.dob && dob.blocked && (
          <Denied>
            <DeniedHead>
              <Glyph type="cross" size={14} c="#e06a55" /> ACCESS DENIED
            </DeniedHead>
            <DeniedBody>
              The void does not run a daycare. Minimum clearance age is {minAge}{' '}
              cycles — come back when it won&apos;t chew you up and spit out your
              bones.
            </DeniedBody>
          </Denied>
        )}
        <Gap $h={10} />
        <CheckRow
          checked={form.agreedTerms}
          onChange={v => set('agreedTerms', v)}
          touched={touched.agreedTerms}
          error={eTerms}
        >
          I have read the <Underline>Pilot Compact &amp; EULA</Underline> and accept
          the <Accent2>death-permanence clause</Accent2>. What I lose out there is
          lost for good.
        </CheckRow>
      </Fields>
      <NavRow onBack={onBack}>
        <GlowButton onClick={go}>CONTINUE →</GlowButton>
      </NavRow>
    </Fragment>
  );
};

export default ClearanceStep;
