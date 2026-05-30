'use client';

import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import Starfield from 'ui/atoms/effects/Starfield';
import Scanlines from 'ui/atoms/effects/Scanlines';
import FullscreenPage from 'ui/atoms/layout/FullscreenPage';
import TopBar from 'ui/molecules/landing/TopBar';
import HeroBackground from 'ui/molecules/landing/HeroBackground';
import HeroContent from 'ui/molecules/landing/HeroContent';
import HeroGrid from 'ui/molecules/landing/HeroGrid';
import AuthTabs from 'ui/molecules/landing/AuthTabs';
import AuthForm from 'ui/molecules/landing/AuthForm';
import GrantedScreen from 'ui/molecules/landing/GrantedScreen';
import ConsoleBox from 'ui/molecules/landing/ConsoleBox';
import { WORLD, fmt } from '@/lib/intake/data';
import { useTicker } from '@/lib/intake/useTicker';
import { useTypewriter } from '@/lib/intake/useTypewriter';

type Mode = 'login' | 'register';
type Phase = 'idle' | 'working' | 'denied' | 'granted';

const FACTIONS = [
  'UNALIGNED',
  'THE RUST CHOIR',
  'VANTA CARTEL',
  'ORION COMPACT',
  'DEEPWAKE',
];

const AUTH_TABS = [
  ['login', 'JACK IN'],
  ['register', 'NEW PILOT'],
] as const;

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
    <FullscreenPage>
      <HeroBackground />
      <Starfield count={90} drift={0.006} color="200,220,255" />
      <Scanlines factor={0.28} />

      <TopBar online={fmt(online)} node={WORLD.node} build={WORLD.build} />

      <HeroGrid>
        <HeroContent
          eyebrow={`${WORLD.sector} · OPEN BETA`}
          tagline={tag}
          taglineDone={tagDone}
          stats={[
            ['PILOTS', fmt(online)],
            ['FACTIONS', String(WORLD.factions)],
            ['UNIVERSE TICK', WORLD.tick.replace('T+ ', 'T+')],
          ]}
        />

        <ConsoleBox>
          <AuthTabs
            activeTab={mode}
            tabs={AUTH_TABS}
            onTabChange={m => switchMode(m as Mode)}
          />

          {phase === 'granted' ? (
            <GrantedScreen message={msg} />
          ) : (
            <AuthForm
              mode={mode}
              phase={phase}
              handle={handle}
              password={key}
              faction={faction}
              factions={FACTIONS}
              message={msg}
              onHandleChange={setHandle}
              onPasswordChange={setKey}
              onFactionChange={setFaction}
              onSubmit={submit}
            />
          )}
        </ConsoleBox>
      </HeroGrid>
    </FullscreenPage>
  );
};

export default LandingEclipse;
