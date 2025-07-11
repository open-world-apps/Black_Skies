'use client';

import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import { ApolloError, gql, useQuery } from '@apollo/client';

import { CharacterShort, CharsReqData } from '../types/graphql';

const GET_CHARACTERS = gql`
  query GetCharacters {
    characterQueries {
      characters {
        charId
        name
        rank
        money
        portrait
        lastLocation
        stats {
          health {
            meta
          }
        }
      }
    }
  }
`;

interface ProviderProps {
  setChars: Dispatch<SetStateAction<Array<CharacterShort>>>;
  setError: Dispatch<SetStateAction<ApolloError | undefined>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const DashProvider: FC<ProviderProps> = ({
  setChars,
  setError,
  setLoading,
}) => {
  const { loading, error, data } = useQuery<CharsReqData>(GET_CHARACTERS);

  useEffect(() => {
    setChars(data!.characterQueries.characters);
    setError(error);
    setLoading(loading);
  }, []);

  return null;
};

export default DashProvider;
