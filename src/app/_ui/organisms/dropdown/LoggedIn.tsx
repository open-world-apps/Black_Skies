import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React, { FC, ReactElement } from 'react';
import Item from 'ui/atoms/generic/dropdown/Item';

interface LoggedInProps {
  router: AppRouterInstance;
}

const LoggedIn: FC<LoggedInProps> = ({ router }): ReactElement => (
  <>
    <Item onClick={() => router.push('/auth/login')}>Profile</Item>
    <Item onClick={() => router.push('/auth/register')}>Settings</Item>
    <Item onClick={() => router.push('/auth/logout')}>Logout</Item>
    <Item>Player Support</Item>
  </>
);

export default LoggedIn;
