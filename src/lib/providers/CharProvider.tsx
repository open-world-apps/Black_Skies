'use client';

import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import { ApolloError, gql, useQuery } from '@apollo/client';

import { CharacterMeta, CharsReqData } from '../types/types';

const GET_CHARACTERS = gql`
  query GetCharacters {
    characterQueries {
      characters {
        id
        archetype
        bio
        birthdate
        charId
        charType
        description
        eyeColor
        hairColor
        height
        name
        online
        weight
      }
    }
  }
`;

interface ProviderProps {
  setChars: Dispatch<SetStateAction<CharacterMeta[]>>;
  setError: Dispatch<SetStateAction<ApolloError | undefined>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const CharProvider: FC<ProviderProps> = ({
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

export default CharProvider;
