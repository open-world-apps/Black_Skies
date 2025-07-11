export type Archetype = {
  name: string;
  description: string;
};

export enum CharType {
  NPC,
  PLAYER,
}

export enum VitalsCondition {
  ELEVATED = 101,
  STABLE = 100,
  CRITICAL = 20,
  FLATLINED = 0,
}

export type Character = {
  charId: string;
  archetype: Archetype;
  money: number;
  bio?: string;
  birthdate: Date;
  charType: CharType;
  lastLocation: Location;
  description: string;
  eyeColor: string;
  hairColor: string;
  height: string;
  name: string;
  status: string;
  online: boolean;
  weight: string;
  rank?: string;
  portrait?: string;
  stats: CharacterStats;
};

export type CharacterShort = {
  charId: string;
  name: string;
  rank?: string;
  money: number;
  status: string;
  portrait?: string;
  lastLocation: Location;
  stats: {
    health: {
      meta: HealthMeta;
    };
  };
};

export type HealthVitals = {
  bp: VitalsCondition;
  hr: VitalsCondition;
  spo2: VitalsCondition;
};

export type HealthMeta = {
  isAlive: boolean;
  isConscious: boolean;
  isAlert: boolean;
  isPoisoned: boolean;
  vitals: HealthVitals;
  causeOfDeath: string;
  lastVitalCheck: Date;
};

export type HealthStats = {
  bp: number;
  hr: number;
  spo2: number;
  consciousLvl: number;
  neuralInt: number;
  bloodLossRate: number;
  painLvl: number;
  adrenalineLvl: number;
  stunLvl: number;
  fatique: number;
  temp: number;
  toxicity: number;
  meta: HealthMeta;
};

export type CharacterStats = {
  health: HealthStats;
  stamina: number;
  core: {
    dex: number;
    str: number;
    agil: number;
    int: number;
    perc: number;
    cha: number;
  };
};

export type CharsReqData = {
  characterQueries: {
    characters: Array<CharacterShort>;
  };
};

export type Location = {
  x: number | 'Unknown';
  y: number | 'Unknown';
  z: number | 'Unknown';
  name?: string;
};

export type Task = {
  task: string;
  timeRemaining: string;
};
