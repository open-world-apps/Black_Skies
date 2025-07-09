'use client';

import React, { FC, ReactElement, useState } from 'react';

import Container from 'ui/atoms/Container';
import FlexContainer from 'ui/atoms/FlexContainer';

import { CharacterMeta } from '@/lib/types/types';
import { ApolloError } from '@apollo/client';
import CharProvider from '@/lib/providers/CharProvider';

const Dashboard: FC = (): ReactElement => {
  const [activeCharacter, setActiveCharacter] = useState(null);
  const [characters, setCharacters] = useState<Array<CharacterMeta>>([]);
  const [error, setError] = useState<ApolloError | undefined>();
  const [loading, setLoading] = useState(true);

  return (
    <Container height="100%">
      <CharProvider
        setChars={setCharacters}
        setError={setError}
        setLoading={setLoading}
      />
      <FlexContainer colGap="20px" justifyContent="space-evenly">
        {(loading && <p>Loading characters...</p>) ||
          (characters && <p>Characters</p>) ||
          (error && <p>errors</p>)}
      </FlexContainer>
    </Container>
  );
};

export default Dashboard;
