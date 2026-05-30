'use client';

import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import styled from 'styled-components';

import Starfield from 'ui/atoms/intake/Starfield';
import Scanlines from 'ui/atoms/intake/Scanlines';
import Glyph from 'ui/atoms/intake/Glyph';
import CornerFrame from 'ui/atoms/intake/CornerFrame';
import GlowButton from 'ui/atoms/intake/GlowButton';
import Field from 'ui/atoms/intake/Field';
import { WORLD, fmt } from '@/lib/intake/data';
import { useTicker } from '@/lib/intake/useTicker';
import { useTypewriter } from '@/lib/intake/useTypewriter';

type Mode = 'login' | 'register';
type Phase = 'idle' | 'working' | 'denied' | 'granted';

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
  background: #05060a;
  overflow: hidden;
  font-family: var(--bs-mono);
  color: var(--bs-ink);
`;

const Hero = styled.div`
  position: absolute;
  inset: 0;
  background-image: url('/intake/eclipse-hero.png');
  background-size: cover;
  background-position: center right;
`;

const ScrimX = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(5, 6, 10, 0.96) 0%,
    rgba(5, 6, 10, 0.86) 32%,
    rgba(5, 6, 10, 0.35) 60%,
    rgba(5, 6, 10, 0) 100%
  );
`;

const ScrimY = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(5, 6, 10, 0.92) 0%, rgba(5, 6, 10, 0) 38%);
`;

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 30px 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BrandName = styled.span`
  font-family: var(--bs-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.34em;
`;

const Status = styled.div`
  display: flex;
  gap: 28px;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--bs-ink-dim);
`;

const Live = styled.span`
  color: var(--bs-accent2);
`;

const Grid = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  padding: 0 56px;
  z-index: 10;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div`
  max-width: 560px;
`;

const Eyebrow = styled.div`
  font-size: 11px;
  letter-spacing: 0.4em;
  color: var(--bs-accent);
  margin-bottom: 22px;
`;

const Wordmark = styled.h1`
  font-family: var(--bs-display);
  font-weight: 700;
  font-size: 92px;
  line-height: 0.92;
  letter-spacing: -0.01em;
  margin: 0;
  color: #f3f5f8;
  text-shadow: 0 0 60px rgba(0, 0, 0, 0.6);

  @media (max-width: 1100px) {
    font-size: 72px;
  }
`;

const Skies = styled.span`
  color: #fff;
  position: relative;
`;

const SkiesDot = styled.span`
  position: absolute;
  right: -18px;
  top: 6px;
  width: 10px;
  height: 10px;
  background: var(--bs-accent);
  box-shadow: 0 0 26px 6px var(--bs-accent);
  border-radius: 50%;
`;

const Tagline = styled.p`
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: 0.02em;
  color: var(--bs-ink-dim);
  margin: 26px 0 0;
  min-height: 46px;
  max-width: 440px;
`;

const Cursor = styled.span<{ $done: boolean }>`
  opacity: ${({ $done }) => ($done ? 0 : 1)};
  color: var(--bs-accent);
`;

const Stats = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 44px;
`;

const StatValue = styled.div`
  font-family: var(--bs-display);
  font-size: 26px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`;

const StatLabel = styled.div`
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--bs-ink-dim);
  margin-top: 4px;
`;

const ConsoleWrap = styled.div`
  justify-self: end;
  width: 360px;

  @media (max-width: 860px) {
    justify-self: start;
    margin-top: 36px;
  }
`;

const Console = styled.div`
  background: rgba(8, 10, 16, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--bs-line);
  padding: 30px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 26px;
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0 12px;
  border-bottom: 2px solid
    ${({ $active }) => ($active ? 'var(--bs-accent)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--bs-ink)' : 'var(--bs-ink-dim)')};
  font-family: var(--bs-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  transition: all 0.2s;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SelectLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const SelectHead = styled.span`
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--bs-ink-dim);
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--bs-line);
  color: var(--bs-ink);
  font-family: var(--bs-mono);
  font-size: 13px;
  padding: 10px;
  outline: none;

  option {
    background: #0a0c12;
  }
`;

const MsgAccent = styled.div`
  font-size: 11px;
  color: var(--bs-accent);
  letter-spacing: 0.04em;
`;

const MsgWorking = styled.div`
  font-size: 11px;
  color: var(--bs-accent2);
  letter-spacing: 0.04em;
`;

const FootNote = styled.div`
  font-size: 10px;
  color: var(--bs-ink-dim);
  letter-spacing: 0.1em;
  text-align: center;
  line-height: 1.6;
`;

const Granted = styled.div`
  padding: 14px 0;
`;

const GrantedTitle = styled.div`
  font-family: var(--bs-display);
  font-size: 19px;
  margin-top: 16px;
  color: #fff;
`;

const GrantedMsg = styled.div`
  font-size: 12px;
  color: var(--bs-accent2);
  margin-top: 10px;
  line-height: 1.6;
`;

const GrantedDetail = styled.div`
  font-size: 11px;
  color: var(--bs-ink-dim);
  margin-top: 18px;
  line-height: 1.7;
`;

const FACTIONS = ['UNALIGNED', 'THE RUST CHOIR', 'VANTA CARTEL', 'ORION COMPACT', 'DEEPWAKE'];

const tick = () => Math.floor(Math.random() * 7) - 2;

const LandingEclipse: FC = () => {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [handle, setHandle] = useState('');
  const [key, setKey] = useState('');
  const [faction, setFaction] = useState(FACTIONS[0]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [msg, setMsg] = useState('');
  const online = useTicker(WORLD.online, tick, 2600);
  const [tag, tagDone] = useTypewriter(
    'A persistent-universe MUD of crime, capital, and conquest.',
    { speed: 22, delay: 700 }
  );

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    // New pilot → hand off to the full intake flow.
    if (mode === 'register') {
      router.push('/auth/register');
      return;
    }

    if (!handle.trim() || !key.trim()) {
      setPhase('denied');
      setMsg('// missing credentials — handle and access key required');
      return;
    }

    setPhase('working');
    setMsg('// negotiating handshake with ' + WORLD.node + '…');

    const res = await signIn('credentials', {
      username: handle.trim(),
      password: key,
      redirect: false,
    });

    if (res?.ok) {
      setPhase('granted');
      setMsg(`// access granted — welcome back, ${handle.trim()}`);
    } else {
      setPhase('denied');
      setMsg('// access denied — credentials rejected at the gate');
    }
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setPhase('idle');
    setMsg('');
  };

  return (
    <Root>
      <Hero />
      <ScrimX />
      <ScrimY />
      <Starfield count={90} drift={0.006} color="200,220,255" />
      <Scanlines factor={0.28} />

      <TopBar>
        <Brand>
          <Glyph type="node" size={20} c="var(--bs-accent)" />
          <BrandName>BLACK&nbsp;SKIES</BrandName>
        </Brand>
        <Status>
          <span>
            <Live>●</Live>&nbsp; {fmt(online)} ONLINE
          </span>
          <span>{WORLD.node}</span>
          <span>{WORLD.build}</span>
        </Status>
      </TopBar>

      <Grid>
        <Left>
          <Eyebrow>{WORLD.sector} · OPEN BETA</Eyebrow>
          <Wordmark>
            BLACK
            <br />
            <Skies>
              SKIES
              <SkiesDot />
            </Skies>
          </Wordmark>
          <Tagline>
            {tag}
            <Cursor $done={tagDone}>▋</Cursor>
          </Tagline>
          <Stats>
            {(
              [
                ['PILOTS', fmt(online)],
                ['FACTIONS', String(WORLD.factions)],
                ['UNIVERSE TICK', WORLD.tick.replace('T+ ', 'T+')],
              ] as const
            ).map(([l, v]) => (
              <div key={l}>
                <StatValue>{v}</StatValue>
                <StatLabel>{l}</StatLabel>
              </div>
            ))}
          </Stats>
        </Left>

        <ConsoleWrap>
          <CornerFrame color="var(--bs-line)" len={16}>
            <Console>
              <Tabs>
                {(
                  [
                    ['login', 'JACK IN'],
                    ['register', 'NEW PILOT'],
                  ] as const
                ).map(([m, l]) => (
                  <Tab key={m} type="button" $active={mode === m} onClick={() => switchMode(m)}>
                    {l}
                  </Tab>
                ))}
              </Tabs>

              {phase === 'granted' ? (
                <Granted>
                  <Glyph type="node" size={30} c="var(--bs-accent2)" />
                  <GrantedTitle>CONNECTION ESTABLISHED</GrantedTitle>
                  <GrantedMsg>{msg}</GrantedMsg>
                  <GrantedDetail>
                    routing to {WORLD.node}…
                    <br />
                    loading dossier · syncing empire · arming nerve
                  </GrantedDetail>
                  <div style={{ marginTop: 22 }}>
                    <GlowButton kind="t" wide onClick={() => router.push('/')}>
                      ↵ ENTER THE VOID
                    </GlowButton>
                  </div>
                </Granted>
              ) : (
                <Form onSubmit={submit}>
                  <Field label="HANDLE" value={handle} onChange={setHandle} placeholder="enter callsign" />
                  {mode === 'login' && (
                    <Field
                      label="ACCESS KEY"
                      value={key}
                      onChange={setKey}
                      type="password"
                      placeholder="••••••••"
                    />
                  )}
                  {mode === 'register' && (
                    <SelectLabel>
                      <SelectHead>STARTING ALLEGIANCE</SelectHead>
                      <Select value={faction} onChange={e => setFaction(e.target.value)}>
                        {FACTIONS.map(f => (
                          <option key={f}>{f}</option>
                        ))}
                      </Select>
                    </SelectLabel>
                  )}
                  {msg && phase === 'denied' && <MsgAccent>{msg}</MsgAccent>}
                  {phase === 'working' && (
                    <MsgWorking>
                      {msg}
                      <span className="bs-blink">_</span>
                    </MsgWorking>
                  )}
                  <div style={{ marginTop: 4 }}>
                    <GlowButton type="submit" wide disabled={phase === 'working'}>
                      {phase === 'working'
                        ? 'STAND BY…'
                        : mode === 'login'
                          ? '↵ ENTER THE VOID'
                          : '↵ REQUEST ACCESS'}
                    </GlowButton>
                  </div>
                  <FootNote>
                    {mode === 'login'
                      ? 'no account survives the dark unaided.'
                      : 'death is permanent for the unprepared.'}
                  </FootNote>
                </Form>
              )}
            </Console>
          </CornerFrame>
        </ConsoleWrap>
      </Grid>
    </Root>
  );
};

export default LandingEclipse;
