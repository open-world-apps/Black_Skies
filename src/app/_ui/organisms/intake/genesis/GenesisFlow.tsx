'use client';

import { Fragment, useState } from 'react';

import ArchetypeStep from './ArchetypeStep';
import DossierStep from './DossierStep';
import ForgeStep from './ForgeStep';
import TraitsStep from './TraitsStep';
import AllegianceStep from './AllegianceStep';
import SpawnStep from './SpawnStep';
import BioAnalyzingModal from 'ui/organisms/intake/BioAnalyzingModal';
import {
  GENESIS_SUBSTEPS,
  computeSheet,
  lockedTraitsFromBio,
} from '@/lib/intake/genesis';
import { GenesisData } from '@/lib/intake/types';

interface GenesisFlowProps {
  data: GenesisData;
  set: (patch: Partial<GenesisData>) => void;
  subIndex: number;
  setSubIndex: (i: number) => void;
  onComplete: () => void;
  onBackToClearance: () => void;
}

const GenesisFlow = ({
  data,
  set,
  subIndex,
  setSubIndex,
  onComplete,
  onBackToClearance,
}: GenesisFlowProps) => {
  const [analyzing, setAnalyzing] = useState(false);
  const goto = (i: number) => setSubIndex(i);

  // Dossier submit: compute the sheet + locked traits behind the curtain.
  const fromDossier = () => {
    const physSeed =
      (data.physical || '') + '|H' + (data.height || '') + '|W' + (data.weight || '');
    const sheet = computeSheet({ archetype: data.archetype, bio: data.bio, physical: physSeed });
    const locked = lockedTraitsFromBio({ bio: data.bio, physical: physSeed, age: data.age });
    const picked = (data.pickedTraits || []).filter(k => !locked.includes(k));
    set({ sheet, lockedTraits: locked, pickedTraits: picked });
    setAnalyzing(true);
  };

  const togglePicked = (key: string) => {
    const cur = data.pickedTraits || [];
    if (cur.includes(key)) set({ pickedTraits: cur.filter(k => k !== key) });
    else if (cur.length < 2) set({ pickedTraits: [...cur, key] });
  };

  const setField = <K extends keyof GenesisData>(k: K, v: GenesisData[K]) =>
    set({ [k]: v } as Partial<GenesisData>);

  const sub = GENESIS_SUBSTEPS[subIndex];

  return (
    <Fragment>
      {sub.key === 'archetype' && (
        <ArchetypeStep
          value={data.archetype}
          onChange={v => set({ archetype: v })}
          onNext={() => goto(1)}
          onBack={onBackToClearance}
        />
      )}
      {sub.key === 'dossier' && (
        <DossierStep form={data} set={setField} onNext={fromDossier} onBack={() => goto(0)} />
      )}
      {sub.key === 'forge' && data.sheet && (
        <ForgeStep
          sheet={data.sheet}
          archetype={data.archetype}
          onNext={() => goto(3)}
          onBack={() => goto(1)}
        />
      )}
      {sub.key === 'traits' && (
        <TraitsStep
          lockedKeys={data.lockedTraits}
          picked={data.pickedTraits}
          onTogglePick={togglePicked}
          pickTarget={2}
          onNext={() => goto(4)}
          onBack={() => goto(2)}
        />
      )}
      {sub.key === 'allegiance' && (
        <AllegianceStep
          value={data.allegiance}
          onChange={v => set({ allegiance: v, spawn: null })}
          onNext={() => goto(5)}
          onBack={() => goto(3)}
        />
      )}
      {sub.key === 'spawn' && (
        <SpawnStep
          allegiance={data.allegiance}
          value={data.spawn}
          onChange={v => set({ spawn: v })}
          onNext={onComplete}
          onBack={() => goto(4)}
        />
      )}

      {analyzing && (
        <BioAnalyzingModal
          onDone={() => {
            setAnalyzing(false);
            goto(2);
          }}
        />
      )}
    </Fragment>
  );
};

export default GenesisFlow;
