'use client';

import { FC, useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import Starfield from 'ui/atoms/intake/Starfield';
import Scanlines from 'ui/atoms/intake/Scanlines';
import SideRail from 'ui/organisms/intake/SideRail';
import IdentityStep from 'ui/organisms/intake/IdentityStep';
import ClearanceStep from 'ui/organisms/intake/ClearanceStep';
import CommissionStep from 'ui/organisms/intake/CommissionStep';
import GrantedModal from 'ui/organisms/intake/GrantedModal';
import AbortDialog from 'ui/organisms/intake/AbortDialog';
import GenesisFlow from 'ui/organisms/intake/genesis/GenesisFlow';
import GenesisSubstepRail from 'ui/molecules/intake/GenesisSubstepRail';
import { STEPS } from '@/lib/intake/steps';
import { GENESIS_SUBSTEPS } from '@/lib/intake/genesis';
import { BLANK_FORM, GENESIS_BLANK, DEFAULT_MIN_AGE } from '@/lib/intake/constants';
import { GenesisData, IntakeForm } from '@/lib/intake/types';
import { useTicker } from '@/lib/intake/useTicker';
import { WORLD } from '@/lib/intake/data';

interface PilotIntakeProps {
  minAge?: number;
}

type Overlay = null | 'abort' | 'granted';

const Root = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  background: #05060a;
  color: var(--bs-ink);
  overflow: hidden;
`;

const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  background-image: url('/intake/eclipse-hero.png');
  background-size: cover;
  background-position: center;
  opacity: 0.16;
  filter: saturate(0.8);
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    120% 90% at 70% 30%,
    rgba(5, 6, 10, 0.5),
    rgba(5, 6, 10, 0.96)
  );
`;

const Layout = styled.div`
  position: relative;
  z-index: 5;
  display: flex;
  width: 100%;
  height: 100%;
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  padding: 64px 56px;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(150, 170, 190, 0.16);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(232, 147, 47, 0.4);
  }
`;

const Column = styled.div`
  width: 100%;
  max-width: 580px;
`;

const ErrorNote = styled.div`
  margin-top: 18px;
  font-family: var(--bs-mono);
  font-size: 11.5px;
  letter-spacing: 0.04em;
  color: #e06a55;
`;

const tick = () => Math.floor(Math.random() * 7) - 2;

const PilotIntake: FC<PilotIntakeProps> = ({ minAge = DEFAULT_MIN_AGE }) => {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<IntakeForm>(BLANK_FORM);
  const [genesis, setGenesis] = useState<GenesisData>(GENESIS_BLANK);
  const [genesisSubIndex, setGenesisSubIndex] = useState(0);
  const [genesisMaxReached, setGenesisMaxReached] = useState(0);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLElement>(null);
  const online = useTicker(WORLD.online, tick, 2600);

  const set = useCallback(
    <K extends keyof IntakeForm>(k: K, v: IntakeForm[K]) =>
      setForm(f => ({ ...f, [k]: v })),
    []
  );
  const touch = useCallback(
    (k: string) => setTouched(t => ({ ...t, [k]: true })),
    []
  );
  const goto = useCallback((i: number) => {
    setStepIndex(i);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, []);

  const setG = useCallback(
    (patch: Partial<GenesisData>) => setGenesis(g => ({ ...g, ...patch })),
    []
  );

  const gotoSub = useCallback((i: number) => {
    setGenesisSubIndex(i);
    setGenesisMaxReached(m => Math.max(m, i));
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, []);

  const reset = useCallback(() => {
    setForm(BLANK_FORM);
    setTouched({});
    setGenesis(GENESIS_BLANK);
    setGenesisSubIndex(0);
    setGenesisMaxReached(0);
    setSubmitError(null);
    goto(0);
  }, [goto]);

  const enterGenesis = useCallback(() => {
    setGenesisSubIndex(0);
    goto(2);
  }, [goto]);

  const commission = useCallback(async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/profile/create', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          displayName: form.displayName,
          email: form.email,
          accessKey: form.accessKey,
          country: form.country,
          dob: form.dob,
          agreedTerms: form.agreedTerms,
          genesis: {
            archetype: genesis.archetype,
            pilotName: genesis.pilotName,
            age: genesis.age,
            height: genesis.height,
            weight: genesis.weight,
            physical: genesis.physical,
            bio: genesis.bio,
            pickedTraits: genesis.pickedTraits,
            allegiance: genesis.allegiance,
            spawn: genesis.spawn,
          },
        }),
      });
      const data: { success?: boolean; userId?: string; error?: string } =
        await res.json();
      if (res.ok && data.success && data.userId) {
        setUserId(data.userId);
        setOverlay('granted');
      } else {
        setSubmitError(data.error || 'Commission failed — try again.');
      }
    } catch {
      setSubmitError('Network error — the registry did not respond.');
    } finally {
      setSubmitting(false);
    }
  }, [form, genesis]);

  const step = STEPS[stepIndex].key;

  return (
    <Root>
      <Atmosphere />
      <Vignette />
      <Starfield count={70} drift={0.004} color="200,220,255" />
      <Scanlines factor={0.22} />

      <Layout>
        <SideRail
          stepIndex={stepIndex}
          online={online}
          genesisSlot={
            step === 'genesis' ? (
              <GenesisSubstepRail
                subIndex={genesisSubIndex}
                maxReached={genesisMaxReached}
                onJump={gotoSub}
              />
            ) : undefined
          }
        />

        <Main ref={scrollRef}>
          <Column>
            <div
              key={step + (step === 'genesis' ? ':' + genesisSubIndex : '')}
              className="bs-step"
            >
              {step === 'identity' && (
                <IdentityStep
                  form={form}
                  set={set}
                  touched={touched}
                  touch={touch}
                  onNext={() => goto(1)}
                  onAbort={() => setOverlay('abort')}
                />
              )}
              {step === 'clearance' && (
                <ClearanceStep
                  form={form}
                  set={set}
                  touched={touched}
                  touch={touch}
                  minAge={minAge}
                  onNext={enterGenesis}
                  onBack={() => goto(0)}
                />
              )}
              {step === 'genesis' && (
                <GenesisFlow
                  data={genesis}
                  set={setG}
                  subIndex={genesisSubIndex}
                  setSubIndex={gotoSub}
                  onComplete={() => goto(3)}
                  onBackToClearance={() => goto(1)}
                />
              )}
              {step === 'commission' && (
                <>
                  <CommissionStep
                    form={form}
                    genesis={genesis}
                    minAge={minAge}
                    onBack={() => {
                      gotoSub(GENESIS_SUBSTEPS.length - 1);
                      goto(2);
                    }}
                    onRestart={reset}
                    onAbort={() => setOverlay('abort')}
                    onConfirm={submitting ? () => undefined : commission}
                  />
                  {submitError && <ErrorNote>// {submitError}</ErrorNote>}
                </>
              )}
            </div>
          </Column>
        </Main>
      </Layout>

      {overlay === 'abort' && (
        <AbortDialog
          onClose={() => setOverlay(null)}
          onConfirm={() => {
            setOverlay(null);
            reset();
          }}
        />
      )}
      {overlay === 'granted' && (
        <GrantedModal
          displayName={form.displayName}
          onEnter={() =>
            router.push(userId ? `/profile/${userId}/dashboard` : '/')
          }
        />
      )}
    </Root>
  );
};

export default PilotIntake;
