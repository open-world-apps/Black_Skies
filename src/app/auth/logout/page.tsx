'use client';

import React, { FC, ReactElement, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

const Logout: FC = (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') signOut();
  }, []);

  return <></>;
};

export default Logout;
