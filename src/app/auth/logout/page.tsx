'use client';

import { FC, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

const Logout: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') signOut();
  }, []);

  return null;
};

export default Logout;
