// Initial blank state for the intake form + genesis builder.

import { GenesisData, IntakeForm } from './types';

export const BLANK_FORM: IntakeForm = {
  displayName: '',
  email: '',
  country: '',
  accessKey: '',
  dob: { d: '', m: '', y: '' },
  agreedTerms: false,
};

export const GENESIS_BLANK: GenesisData = {
  archetype: null,
  pilotName: '',
  age: '',
  height: '',
  weight: '',
  physical: '',
  bio: '',
  sheet: null,
  lockedTraits: [],
  pickedTraits: [],
  allegiance: null,
  spawn: null,
};

export const DEFAULT_MIN_AGE = 13;
