'use client';

import { ApolloProvider as Apollo } from '@apollo/client';
import React, { ReactNode } from 'react';
import apolloClient from '../apollo/apolloClient';

const ApolloProvider = ({ children }: { children: ReactNode }) => (
  <Apollo client={apolloClient}>{children}</Apollo>
);

export default ApolloProvider;
