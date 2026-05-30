import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import type { Prisma } from '@@/dist/prisma';

import { prisma } from '@/lib/prisma/prisma';
import { validators } from '@/lib/intake/validators';
import { COUNTRIES } from '@/lib/intake/data';
import { DEFAULT_MIN_AGE } from '@/lib/intake/constants';
import { DOB } from '@/lib/intake/types';
import {
  ARCHETYPES,
  SPAWN_NODES,
  TRAIT_PAIRS,
  FACTIONS,
  computeSheet,
  lockedTraitsFromBio,
  factionHomeNode,
} from '@/lib/intake/genesis';

const saltRounds = process.env.AUTH_SALT_ROUNDS;

type GenesisPayload = {
  archetype?: unknown;
  pilotName?: unknown;
  age?: unknown;
  height?: unknown;
  weight?: unknown;
  physical?: unknown;
  bio?: unknown;
  pickedTraits?: unknown;
  allegiance?: unknown;
  spawn?: unknown;
};

type IntakePayload = {
  displayName?: unknown;
  email?: unknown;
  accessKey?: unknown;
  country?: unknown;
  dob?: unknown;
  agreedTerms?: unknown;
  genesis?: GenesisPayload;
};

const isString = (v: unknown): v is string => typeof v === 'string';

const isDob = (v: unknown): v is DOB =>
  typeof v === 'object' &&
  v !== null &&
  isString((v as DOB).d) &&
  isString((v as DOB).m) &&
  isString((v as DOB).y);

const toInt = (v: unknown): number =>
  isString(v) || typeof v === 'number' ? Math.trunc(Number(v)) : NaN;

const badRequest = (error: string) =>
  NextResponse.json({ success: false, error }, { status: 400 });

const makeRegistryId = (displayName: string): string =>
  'BS-' +
  displayName
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 6)
    .padEnd(4, 'X') +
  '-' +
  String(Math.floor(Math.random() * 9000) + 1000);

export const POST = async (req: Request) => {
  let body: IntakePayload;
  try {
    body = (await req.json()) as IntakePayload;
  } catch {
    return badRequest('Malformed request body.');
  }

  const { displayName, email, accessKey, country, dob, agreedTerms, genesis } = body;

  // ── Identity + clearance (authoritative; mirrors the client) ──
  if (!isString(displayName) || !isString(email) || !isString(accessKey)) {
    return badRequest('Missing required intake fields.');
  }

  const nameErr = validators.displayName(displayName);
  if (nameErr) return badRequest(nameErr);

  const emailErr = validators.email(email);
  if (emailErr) return badRequest(emailErr);

  const keyErr = validators.accessKey(accessKey);
  if (keyErr) return badRequest(keyErr);

  if (!isString(country) || !COUNTRIES.includes(country)) {
    return badRequest('Declare a valid region of origin.');
  }

  if (!isDob(dob)) return badRequest('Date of birth is required.');
  const dobResult = validators.dob(dob, DEFAULT_MIN_AGE);
  if (dobResult.err) return badRequest(dobResult.err);

  if (agreedTerms !== true) {
    return badRequest('You must accept the Pilot Compact to proceed.');
  }

  // ── Genesis dossier ──
  if (!genesis || typeof genesis !== 'object') {
    return badRequest('Genesis record is incomplete.');
  }

  const { archetype, pilotName, physical, bio, allegiance, spawn } = genesis;
  const age = toInt(genesis.age);
  const heightCm = toInt(genesis.height);
  const weightKg = toInt(genesis.weight);

  if (!isString(archetype) || !ARCHETYPES.some(a => a.key === archetype)) {
    return badRequest('Select a valid archetype.');
  }
  if (!isString(pilotName) || pilotName.trim().length < 2 || pilotName.length > 40) {
    return badRequest('Pilot name must be 2–40 characters.');
  }
  if (!Number.isFinite(age) || age < 18 || age > 120) {
    return badRequest('Pilot age must be between 18 and 120.');
  }
  if (!Number.isFinite(heightCm) || heightCm < 120 || heightCm > 240) {
    return badRequest('Height must be between 120 and 240 cm.');
  }
  if (!Number.isFinite(weightKg) || weightKg < 30 || weightKg > 260) {
    return badRequest('Mass must be between 30 and 260 kg.');
  }
  if (!isString(bio) || bio.trim().length < 40 || bio.length > 1400) {
    return badRequest('Biography must be 40–1400 characters.');
  }
  if (physical != null && (!isString(physical) || physical.length > 240)) {
    return badRequest('Marks/modifications must be under 240 characters.');
  }
  if (allegiance != null && (!isString(allegiance) || !FACTIONS.some(f => f.key === allegiance))) {
    return badRequest('Invalid allegiance.');
  }

  const homeNode = isString(allegiance) ? factionHomeNode(allegiance) : null;
  const validSpawnKeys = [
    ...SPAWN_NODES.map(n => n.key),
    ...(homeNode ? [homeNode.key] : []),
  ];
  if (!isString(spawn) || !validSpawnKeys.includes(spawn)) {
    return badRequest('Select a valid spawn point.');
  }

  // Re-derive the sealed sheet + locked traits server-side — client numbers
  // are display-only and never trusted.
  const physSeed = (isString(physical) ? physical : '') + '|H' + heightCm + '|W' + weightKg;
  const skillSheet = computeSheet({ archetype, bio, physical: physSeed });
  const lockedTraits = lockedTraitsFromBio({ bio, physical: physSeed, age: String(age) });

  // Picked traits: keep only valid keys not already locked, cap at 2.
  const traitKeys = new Set(TRAIT_PAIRS.map(p => p.key));
  const rawPicked = Array.isArray(genesis.pickedTraits) ? genesis.pickedTraits : [];
  const pickedTraits = rawPicked
    .filter((k): k is string => isString(k) && traitKeys.has(k) && !lockedTraits.includes(k))
    .slice(0, 2);

  const birthdate = new Date(Number(dob.y), Number(dob.m) - 1, Number(dob.d));

  try {
    const hash = await bcrypt.hash(accessKey, Number(saltRounds));
    const user = await prisma.user.create({
      data: {
        name: displayName.trim(),
        email: email.trim(),
        hashedPwd: hash,
        country,
        birthdate,
        dossier: {
          create: {
            archetype,
            pilotName: pilotName.trim(),
            age,
            heightCm,
            weightKg,
            physical: isString(physical) && physical.length ? physical : null,
            bio: bio.trim(),
            skillSheet: skillSheet as unknown as Prisma.InputJsonValue,
            lockedTraits,
            pickedTraits,
            allegiance: isString(allegiance) ? allegiance : null,
            spawn,
            registryId: makeRegistryId(displayName),
          },
        },
      },
      select: { id: true },
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch {
    // Never leak Prisma internals / stack traces to the client.
    return NextResponse.json(
      { success: false, error: 'Failed to commission pilot. Try again.' },
      { status: 500 }
    );
  }
};
