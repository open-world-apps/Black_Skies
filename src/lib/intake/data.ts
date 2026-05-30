// Reference data + fake persistent-universe state for the intake flow.

export const COUNTRIES: string[] = [
  'UNITED STATES',
  'CANADA',
  'UNITED KINGDOM',
  'IRELAND',
  'GERMANY',
  'FRANCE',
  'NETHERLANDS',
  'SWEDEN',
  'NORWAY',
  'FINLAND',
  'POLAND',
  'SPAIN',
  'ITALY',
  'PORTUGAL',
  'GREECE',
  'AUSTRALIA',
  'NEW ZEALAND',
  'JAPAN',
  'SOUTH KOREA',
  'SINGAPORE',
  'BRAZIL',
  'ARGENTINA',
  'MEXICO',
  'SOUTH AFRICA',
  'INDIA',
  'UNITED ARAB EMIRATES',
  'OFF-WORLD / STATELESS',
];

// Handles already burned into the registry — drives the live uniqueness check.
export const TAKEN_HANDLES: string[] = [
  'vantablack',
  'hex_mire',
  'deadhand',
  'nyx_7',
  'salvage_king',
  'admin',
  'null',
  'rustchoir',
];

// Fake persistent-universe state — seeds the flow so it reads real.
export const WORLD = {
  build: 'v0.7.3 // ORION',
  sector: 'SAGITTARIUS REACH',
  node: 'NODE-07 · TERMINUS',
  online: 4127,
  factions: 38,
  tick: 'T+ 1 842 119',
} as const;

export const fmt = (n: number): string => {
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'k';
  return String(n);
};
