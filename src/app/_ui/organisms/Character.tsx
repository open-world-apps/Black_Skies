import React, { FC, ReactElement } from 'react';

import FlexContainer from 'ui/atoms/FlexContainer';
import CharHeader from 'ui/molecules/CharHeader';

import type { Character as Char } from '@/lib/types/graphql';
import Container from 'ui/atoms/Container';
import Portrait from 'ui/atoms/Portrait';
import BlankPortrait from 'ui/molecules/BlankPortrait';

/**
 * <Container>
 *  <FlexContainer>
 *   char rank?, name, age, level? // I don't know if characters will have a defined level or not.
 *   picture
 *   data
 *     currentLocation
 *     coreStats
 *     currentTask
 *     activeTasks
 *  </FlexContainer>
 * </Container>
 */

interface CharProps {
  character: Char;
  active: boolean;
}

const Character: FC<CharProps> = ({ character, active }): ReactElement => {
  return (
    <FlexContainer
      $height="100%"
      $width="100%"
      $justifyContent="center"
      $alignContent="space-around"
      $column
    >
      <article id="character">
        <CharHeader
          name={character.name}
          rank={character.rank}
          active={active}
        />
        <Container $height="300px" $width="100%">
          {(character.portrait && (
            <Portrait src={character.portrait} alt={character.name} />
          )) || <BlankPortrait />}
        </Container>
      </article>
    </FlexContainer>
  );
};

export default Character;
