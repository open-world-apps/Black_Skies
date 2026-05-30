// Genesis data tables + deterministic derivation helpers.
// Pure + shared: used client-side for previews and server-side as the
// authoritative re-derivation on commit. The bio→skill math is a stable
// mock — same inputs always seal the same sheet.

import { Archetype, Faction, Skill, SkillRow, SpawnNode, TraitPair } from './types';

export type GenesisSubstep = {
  key: 'archetype' | 'dossier' | 'forge' | 'traits' | 'allegiance' | 'spawn';
  label: string;
  sub: string;
};

export const GENESIS_SUBSTEPS: GenesisSubstep[] = [
  { key: 'archetype', label: 'ARCHETYPE', sub: 'inherited cast of the pilot' },
  { key: 'dossier', label: 'DOSSIER', sub: 'flesh, history, scars' },
  { key: 'forge', label: 'SKILL FORGE', sub: 'sealed by the agent' },
  { key: 'traits', label: 'TRAITS', sub: 'strengths bound to weaknesses' },
  { key: 'allegiance', label: 'ALLEGIANCE', sub: 'standing invitations' },
  { key: 'spawn', label: 'SPAWN POINT', sub: 'where the void first sees you' },
];

// Six pilot casts. Each mod-sum is balanced to 0 so the picker can't be gamed.
export const ARCHETYPES: Archetype[] = [
  {
    key: 'voidborn',
    name: 'VOID-BORN',
    glyph: 'node',
    ethos: 'born in the black — never knew dirt under your boots',
    mods: { piloting: 3, perception: 2, science: 1, social: -2, command: -2, trade: -1, medicine: -1 },
  },
  {
    key: 'conscript',
    name: 'CONSCRIPT',
    glyph: 'cross',
    ethos: 'exited a state war with new skills and old grudges',
    mods: { combat: 3, nerve: 2, command: 1, trade: -2, social: -2, science: -1, medicine: -1 },
  },
  {
    key: 'greaseprophet',
    name: 'GREASE PROPHET',
    glyph: 'bars',
    ethos: 'cult mechanic — treats engines as scripture',
    mods: { engineering: 3, science: 2, salvage: 1, social: -3, command: -1, combat: -1, trade: -1 },
  },
  {
    key: 'mirrorhand',
    name: 'MIRRORHAND',
    glyph: 'diamond',
    ethos: 'face-thief — ran cons before you ran cargo',
    mods: { social: 3, stealth: 2, perception: 1, combat: -2, command: -1, engineering: -2, medicine: -1 },
  },
  {
    key: 'scavenger',
    name: 'SCAVENGER',
    glyph: 'ring',
    ethos: 'picked the bones of dead fleets in the boneyards',
    mods: { salvage: 3, engineering: 2, perception: 1, command: -2, trade: -1, social: -2, nerve: -1 },
  },
  {
    key: 'outrider',
    name: 'OUTRIDER',
    glyph: 'arrow',
    ethos: 'frontier pilot — no flag, no leash, no bond',
    mods: { piloting: 2, perception: 2, nerve: 2, social: -2, science: -2, command: -1, engineering: -1 },
  },
];

// Fixed sheet — 12 disciplines grouped by category.
export const SKILLS: Skill[] = [
  { key: 'piloting', label: 'PILOTING', cat: 'flight' },
  { key: 'combat', label: 'COMBAT', cat: 'flight' },
  { key: 'perception', label: 'PERCEPTION', cat: 'flight' },
  { key: 'nerve', label: 'NERVE', cat: 'flight' },
  { key: 'engineering', label: 'ENGINEERING', cat: 'tech' },
  { key: 'science', label: 'SCIENCE', cat: 'tech' },
  { key: 'salvage', label: 'SALVAGE', cat: 'tech' },
  { key: 'medicine', label: 'MEDICINE', cat: 'tech' },
  { key: 'social', label: 'SOCIAL', cat: 'soul' },
  { key: 'trade', label: 'TRADE', cat: 'soul' },
  { key: 'stealth', label: 'STEALTH', cat: 'soul' },
  { key: 'command', label: 'COMMAND', cat: 'soul' },
];

// Eight strength/weakness pairs. Three lock in from bio analysis, two more picked.
export const TRAIT_PAIRS: TraitPair[] = [
  {
    key: 'iron_stomach',
    strong: 'Iron Stomach',
    sDesc: 'unflinching in hard burns and zero-g, +15% stress cap',
    weak: 'Soft Hands',
    wDesc: '-10% weapon precision under direct fire',
    rationale: 'your account dwells on hunger and the long burns',
  },
  {
    key: 'sharp_memory',
    strong: 'Sharp Memory',
    sDesc: 'recall any schematic after one viewing',
    weak: 'Slow Burn',
    wDesc: '+50% time to grind new disciplines',
    rationale: 'specific dates and ship hulls cited with no hesitation',
  },
  {
    key: 'cold_blood',
    strong: 'Cold Blood',
    sDesc: 'panic resistance — no first-shot penalty',
    weak: 'Empty Faith',
    wDesc: 'no morale bonus from rallies or sermons',
    rationale: 'a flat affect runs through every loss in the record',
  },
  {
    key: 'quick_draw',
    strong: 'Quick Draw',
    sDesc: 'first action in any engagement window',
    weak: 'Loose Tongue',
    wDesc: '-15% to negotiation outcomes',
    rationale: 'three boasts before you mention any name but your own',
  },
  {
    key: 'born_lucky',
    strong: 'Born Lucky',
    sDesc: 'reroll one bad event per cycle',
    weak: 'Hunted',
    wDesc: 'a debt-collector is already in your wake',
    rationale: 'too many close calls survived to be coincidence',
  },
  {
    key: 'engine_whisperer',
    strong: 'Engine-Whisperer',
    sDesc: '+20% repair tick under combat conditions',
    weak: 'Tool-Cursed',
    wDesc: 'civilian appliances fail within reach',
    rationale: 'the engines are spoken about like family in the bio',
  },
  {
    key: 'silver_tongue',
    strong: 'Silver Tongue',
    sDesc: 'discount unlocked at hostile-faction markets',
    weak: 'Trust Issues',
    wDesc: 'crew loyalty starts one tier lower',
    rationale: 'too many friends, all of them recent',
  },
  {
    key: 'eagle_eye',
    strong: 'Eagle Eye',
    sDesc: '+1 sensor range, sees through low-band jam',
    weak: 'Light-Sensitive',
    wDesc: 'blinded one tick longer by flares and EMP',
    rationale: 'detail recall on what should have been routine recon',
  },
];

// Three invitations earned pre-genesis. Accept one or remain UNALIGNED.
export const FACTIONS: Faction[] = [
  {
    key: 'iron_choir',
    name: 'THE IRON CHOIR',
    glyph: 'cross',
    blurb: 'combat collective. weapons-grade orthodoxy.',
    invitedBy: 'BISHOP HARK · sent T+1 839 002',
    perk: 'spawn with full magazine grant and a one-time rally beacon',
    cost: '5% credit tithe, all kills',
    home: 'FORGE-PRIME',
    accent: 'a',
  },
  {
    key: 'silk_vector',
    name: 'SILK VECTOR',
    glyph: 'diamond',
    blurb: 'trade syndicate. clean ledgers, dirty routes.',
    invitedBy: 'PROCURATOR LIN · sent T+1 840 117',
    perk: '−8% market fees on syndicate stations, premium consignment seat',
    cost: 'priority routing for SV cargo over personal lanes',
    home: 'SILKVAULT',
    accent: 't',
  },
  {
    key: 'threadkeepers',
    name: 'THE THREADKEEPERS',
    glyph: 'node',
    blurb: 'info brokers. they have already read this.',
    invitedBy: 'ANONYMOUS · sent T+1 841 988',
    perk: '+1 intelligence ping per cycle, redact your dossier from market scans',
    cost: 'turn in named contacts when asked, no questions returned',
    home: 'NEEDLE STATION',
    accent: 't',
  },
];

// Base star map. Faction homes append live via factionHomeNode().
export const SPAWN_NODES: SpawnNode[] = [
  {
    key: 'terminus_07',
    label: 'TERMINUS-07',
    kind: 'NEUTRAL HUB · NODE-07',
    blurb: 'sector capital. the common spawn — safe, expensive, watched.',
    x: 48,
    y: 52,
    risk: 1,
    perks: ['full medical bay on arrival', 'open market access', 'no faction reprisals'],
    dangers: ['+22% docking and refit fees', 'low salvage yield within 4 jumps'],
  },
  {
    key: 'keth_9',
    label: 'KETH-9',
    kind: 'FRONTIER OUTPOST',
    blurb: 'lawless edge. recon wing went silent here last cycle.',
    x: 76,
    y: 30,
    risk: 3,
    perks: ['+30% salvage density', 'cheap mercenary crews', 'unclaimed contracts'],
    dangers: ['VANTABLACK raiders within 2 jumps', 'no medical bay — patch yourself'],
  },
  {
    key: 'coilspine',
    label: 'COILSPINE BELT',
    kind: 'MINING BELT',
    blurb: 'rich ore, hostile rock. the only neighbors are drill rigs.',
    x: 22,
    y: 38,
    risk: 2,
    perks: ['ore deposits at 2x average yield', 'belt-cover masks signature'],
    dangers: ['no market within 3 jumps', 'mining-cartel toll on every exit'],
  },
  {
    key: 'halon_gate',
    label: 'HALON GATE',
    kind: 'CONTRABAND PORT',
    blurb: 'gateway to the unlit lanes. arms market runs on credit and threats.',
    x: 60,
    y: 78,
    risk: 3,
    perks: ['black market open, no questions', 'cheapest deuterium in the reach'],
    dangers: ['port security is mercenary, not law', 'CRIME flag on first dock'],
  },
  {
    key: 'vantablack_maw',
    label: "VANTABLACK'S MAW",
    kind: 'RAIDER SPACE',
    blurb: 'spawn already on the wrong side of every gun. for the bold or the doomed.',
    x: 30,
    y: 72,
    risk: 5,
    perks: ['raider rep starts at 1 — instant contracts', 'bounties available immediately'],
    dangers: ['every market is hostile', 'death-permanence risk: extreme'],
  },
];

// Faction home as a spawn node — appended only when a faction is joined.
export const factionHomeNode = (factionKey: string): SpawnNode | null => {
  const f = FACTIONS.find(x => x.key === factionKey);
  if (!f) return null;
  const coords: Record<string, { x: number; y: number }> = {
    iron_choir: { x: 18, y: 18 },
    silk_vector: { x: 85, y: 60 },
    threadkeepers: { x: 50, y: 16 },
  };
  const c = coords[factionKey] || { x: 50, y: 50 };
  return {
    key: 'home_' + factionKey,
    label: f.home,
    kind: f.name + ' · HOME STATION',
    blurb: 'guaranteed sanctuary — your sponsor expects to see you here.',
    x: c.x,
    y: c.y,
    risk: 1,
    home: true,
    factionKey,
    accent: f.accent,
    perks: [
      'standing safe-conduct at all faction docks',
      'sponsor contact lives one bulkhead away',
      f.perk,
    ],
    dangers: ['rival factions will know where to start looking', 'leaving requires a debrief'],
  };
};

// FNV-1a hash — deterministic seed source.
export const hashStr = (s: string): number => {
  let h = 0x811c9dc5;
  for (let i = 0; i < (s || '').length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return h >>> 0;
};

// Distribute ~10 bonus points across the 12 skills using a hash.
export const bonusFromBio = (bio: string, physical: string): Record<string, number> => {
  const seed = (bio || '') + '|' + (physical || '');
  if (!seed.replace('|', '').length) return {};
  let h = hashStr(seed) || 1;
  const out: Record<string, number> = {};
  let pool = 10 + (h % 4);
  for (let i = 0; i < 40 && pool > 0; i++) {
    const idx = h % SKILLS.length;
    h = (h * 1664525 + 1013904223) >>> 0;
    const k = SKILLS[idx].key;
    const v = out[k] || 0;
    if (v < 3) {
      out[k] = v + 1;
      pool--;
    }
  }
  return out;
};

// Final sheet = base 5 + archetype mod + bio bonus, clamped 0..15.
export const computeSheet = ({
  archetype,
  bio,
  physical,
}: {
  archetype: string | null;
  bio: string;
  physical: string;
}): SkillRow[] => {
  const arch = ARCHETYPES.find(a => a.key === archetype) || ARCHETYPES[0];
  const bonus = bonusFromBio(bio, physical);
  return SKILLS.map(sk => {
    const base = 5;
    const aMod = arch.mods[sk.key] || 0;
    const bBonus = bonus[sk.key] || 0;
    const total = Math.max(0, Math.min(15, base + aMod + bBonus));
    return { ...sk, base, aMod, bBonus, total };
  });
};

// Pick 3 deterministic locked trait pairs from bio.
export const lockedTraitsFromBio = ({
  bio,
  physical,
  age,
}: {
  bio: string;
  physical: string;
  age: string | number;
}): string[] => {
  const seed = (bio || '') + '|' + (physical || '') + '|' + (age || '');
  let h = hashStr(seed) || 1;
  const picked: string[] = [];
  const used = new Set<number>();
  while (picked.length < 3 && used.size < TRAIT_PAIRS.length) {
    const idx = h % TRAIT_PAIRS.length;
    if (!used.has(idx)) {
      used.add(idx);
      picked.push(TRAIT_PAIRS[idx].key);
    }
    h = (h * 1103515245 + 12345) >>> 0;
  }
  return picked;
};
