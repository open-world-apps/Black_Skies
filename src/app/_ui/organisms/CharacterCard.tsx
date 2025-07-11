'use client';

import React, { FC, ReactElement, useEffect, useState } from 'react';

import Container from 'ui/atoms/Container';
import FlexContainer from 'ui/atoms/FlexContainer';
import Portrait from 'ui/atoms/Portrait';
import BlankPortrait from 'ui/molecules/character/BlankPortrait';

import { formatCurrency } from '@/lib/convertors/money';
import { getActiveChar } from '@/lib/cookies';
import type { CharacterShort as Char, Location } from '@/lib/types/graphql';

interface CharProps {
  character: Char;
}

const CharacterCard: FC<CharProps> = ({ character }): ReactElement => {
  const [active, setActive] = useState(false);
  const [location] = useState<Location>(character.lastLocation);

  useEffect(() => {
    const char = getActiveChar();
    if (char === character.charId) setActive(true);
  }, []);

  return (
    <FlexContainer
      $height="600px"
      $width="300px"
      $justifyContent="center"
      $alignContent="space-around"
      $column
    >
      <article id="character">
        <Container $width="100%">
          <h1>
            {character.name}
            {character.rank && <span>&comma;&nbsp;{character.rank}</span>}
            {active && (
              <>
                &nbsp;<span>(Active)</span>
              </>
            )}
          </h1>
        </Container>
        <Container $alignSelf="center" style={{ textAlign: 'center' }}>
          <p>{location.name}</p>
          <p>
            (x: {location.x}, y: {location.y}, z: {location.z})
          </p>
          <br />
          <p>Status: {character.status}</p>
        </Container>
        <FlexContainer
          $height="250px"
          $width="100%"
          $justifyContent="center"
          $column
        >
          {(character.portrait && (
            <Portrait src={character.portrait} alt={character.name} />
          )) || <BlankPortrait />}
        </FlexContainer>
        <Container $width="100%">
          <p>Money: {formatCurrency(character.money)}</p>
        </Container>
      </article>
    </FlexContainer>
  );
};

export default CharacterCard;
