// Validators + access-key scoring for the intake flow.
// Each validator returns null when valid, else a terse error string.

import { DOB, DobResult, KeyScore } from './types';
import { TAKEN_HANDLES } from './data';

const RX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RX_HANDLE = /^[a-zA-Z0-9_]+$/;

// Access-key strength → { score 0..4, label, pct }.
export const scoreKey = (value: string): KeyScore => {
  const v = value || '';
  const labels = ['EXPOSED', 'FRAGILE', 'ADEQUATE', 'FORTIFIED', 'IRONCLAD'];
  if (!v) return { score: 0, label: '—', pct: 0 };
  let s = 0;
  if (v.length >= 8) s++;
  if (v.length >= 12) s++;
  if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++;
  if (/\d/.test(v)) s++;
  if (/[^a-zA-Z0-9]/.test(v)) s++;
  s = Math.min(4, Math.max(0, s - (v.length < 8 ? 1 : 0)));
  return { score: s, label: labels[s], pct: ((s + 1) / 5) * 100 };
};

export const validators = {
  displayName(v: string): string | null {
    const s = (v || '').trim();
    if (!s) return 'callsign required — the void needs a name to curse';
    if (s.length < 3) return 'too short — 3 characters minimum';
    if (s.length > 18) return 'too long — 18 characters maximum';
    if (!RX_HANDLE.test(s)) return 'letters, numbers, underscore only';
    if (TAKEN_HANDLES.includes(s.toLowerCase()))
      return 'callsign already burned into the registry';
    return null;
  },

  email(v: string): string | null {
    const s = (v || '').trim();
    if (!s) return 'comms address required';
    if (!RX_EMAIL.test(s)) return 'malformed address — check the format';
    return null;
  },

  country(v: string): string | null {
    if (!v) return 'declare a region of origin';
    return null;
  },

  // Parameterised by minimum age (tweakable).
  dob({ d, m, y }: DOB, minAge: number): DobResult {
    if (!d || !m || !y) return { err: 'enter your full date of birth', age: null };
    const day = +d;
    const mon = +m;
    const yr = +y;
    if (mon < 1 || mon > 12) return { err: 'invalid month', age: null };
    const dim = new Date(yr, mon, 0).getDate();
    if (day < 1 || day > dim)
      return { err: 'invalid day for that month', age: null };
    const now = new Date();
    if (yr < 1900 || new Date(yr, mon - 1, day) > now)
      return { err: 'that date has not happened yet', age: null };
    let age = now.getFullYear() - yr;
    const md = now.getMonth() + 1 - mon || now.getDate() - day;
    if (md < 0) age--;
    if (age < minAge)
      return { err: `gate locked — minimum age is ${minAge}`, age, blocked: true };
    return { err: null, age };
  },

  accessKey(v: string): string | null {
    if (!v) return 'access key required';
    if (scoreKey(v).score < 2) return 'too weak — strengthen before proceeding';
    return null;
  },
};
