'use client';

import React, { FC, ReactElement, useState } from 'react';

import Container from 'ui/atoms/Container';
import FlexContainer from 'ui/atoms/FlexContainer';

import CharProvider from '@/lib/providers/DashProvider';
import { CharacterShort } from '@/lib/types/graphql';
import { ApolloError } from '@apollo/client';
import CreateCharacter from 'ui/molecules/character/CreateCharacter';

const Dashboard: FC = (): ReactElement => {
  const [characters, setCharacters] = useState<Array<CharacterShort>>([]);
  const [error, setError] = useState<ApolloError | undefined>();
  const [loading, setLoading] = useState(true);

  return (
    <Container $height="100%">
      <CharProvider
        setChars={setCharacters}
        setError={setError}
        setLoading={setLoading}
      />
      <FlexContainer $colGap="20px" $justifyContent="space-evenly">
        {(loading && <p>Loading characters...</p>) ||
          (characters && <p>Characters</p>) ||
          (!characters && !error && <CreateCharacter />) ||
          (error && <p>errors</p>)}
      </FlexContainer>
    </Container>
  );
};

export default Dashboard;
