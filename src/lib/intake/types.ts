// Shared types for the New Pilot Intake flow.

export type DOB = { d: string; m: string; y: string };

export type IntakeForm = {
  displayName: string;
  email: string;
  country: string;
  accessKey: string;
  dob: DOB;
  agreedTerms: boolean;
};

export type DobResult = {
  err: string | null;
  age: number | null;
  blocked?: boolean;
};

export type KeyScore = {
  score: number;
  label: string;
  pct: number;
};

export type SkillCategory = 'flight' | 'tech' | 'soul';

export type Skill = {
  key: string;
  label: string;
  cat: SkillCategory;
};

export type SkillRow = Skill & {
  base: number;
  aMod: number;
  bBonus: number;
  total: number;
};

export type Archetype = {
  key: string;
  name: string;
  glyph: GlyphType;
  ethos: string;
  mods: Record<string, number>;
};

export type TraitPair = {
  key: string;
  strong: string;
  sDesc: string;
  weak: string;
  wDesc: string;
  rationale: string;
};

export type Faction = {
  key: string;
  name: string;
  glyph: GlyphType;
  blurb: string;
  invitedBy: string;
  perk: string;
  cost: string;
  home: string;
  accent: 'a' | 't';
};

export type SpawnNode = {
  key: string;
  label: string;
  kind: string;
  blurb: string;
  x: number;
  y: number;
  risk: number;
  perks: string[];
  dangers: string[];
  home?: boolean;
  factionKey?: string;
  accent?: 'a' | 't';
};

export type GenesisData = {
  archetype: string | null;
  pilotName: string;
  age: string;
  height: string;
  weight: string;
  physical: string;
  bio: string;
  sheet: SkillRow[] | null;
  lockedTraits: string[];
  pickedTraits: string[];
  allegiance: string | null;
  spawn: string | null;
};

export type GlyphType =
  | 'ring'
  | 'dot'
  | 'diamond'
  | 'chevron'
  | 'cross'
  | 'bars'
  | 'node'
  | 'arrow';
