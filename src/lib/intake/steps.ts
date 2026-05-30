// Top-level intake step definitions.

export type IntakeStep = {
  key: 'identity' | 'clearance' | 'genesis' | 'commission';
  label: string;
  sub: string;
};

export const STEPS: IntakeStep[] = [
  { key: 'identity', label: 'IDENTITY', sub: 'who the void will know you as' },
  { key: 'clearance', label: 'CLEARANCE', sub: 'access key · age-gate · compact' },
  { key: 'genesis', label: 'GENESIS', sub: 'forge the pilot · six-stage build' },
  { key: 'commission', label: 'COMMISSION', sub: 'review dossier · commit to record' },
];
