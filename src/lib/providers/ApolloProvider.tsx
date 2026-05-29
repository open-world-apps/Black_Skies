'use client';

import { ApolloProvider as ApolloClientProvider } from '@apollo/client/react';
import React, { ReactNode } from 'react';
import apolloClient from '../apollo/apolloClient';

const ApolloProvider = ({ children }: { children: ReactNode }) => (
  <ApolloClientProvider client={apolloClient}>{children}</ApolloClientProvider>
);

export default ApolloProvider;
