import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React, { FC, ReactElement } from 'react';
import Item from 'ui/atoms/generic/dropdown/Item';

interface LoggedOutProps {
  router: AppRouterInstance;
}

const LoggedOut: FC<LoggedOutProps> = ({ router }): ReactElement => (
  <>
    <Item onClick={() => router.push('/auth/login')}>Login</Item>
    <Item onClick={() => router.push('/auth/register')}>Register</Item>
  </>
);

export default LoggedOut;
