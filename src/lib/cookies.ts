'use server';

import { cookies } from 'next/headers';

const store = await cookies();

export const setActiveChar = async (charId: string) => {
  store.set({
    name: 'charId',
    value: charId,
    httpOnly: true,
    path: '/',
  });
};

export const getActiveChar = async () => {
  const activeChar = store.get('charId');

  return activeChar?.value;
};
