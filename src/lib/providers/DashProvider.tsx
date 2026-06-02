'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';

import { useQuery } from '@apollo/client/react';
import { GraphQLError } from 'graphql';

import { CharacterShort, CharsReqData } from '../types/graphql';
import { gql, TypedDocumentNode } from '@apollo/client';

const GET_CHARACTERS: TypedDocumentNode<
  CharsReqData,
  Record<string, never>
> = gql`
  query GetCharacters {
    characterQueries {
      characters {
        id
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
  setChars: Dispatch<SetStateAction<Array<CharacterShort> | undefined>>;
  setError: Dispatch<SetStateAction<GraphQLError | undefined>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const DashProvider = ({
  setChars,
  setError,
  setLoading,
}: ProviderProps) => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  useEffect(() => {
    if (data) setChars(data.characterQueries.characters);
    setError(error as GraphQLError | undefined);
    setLoading(loading);
  }, []);

  return null;
};

export default DashProvider;
