import React, { FC, ReactElement } from 'react';

import FlexContainer from 'ui/atoms/FlexContainer';

import { PlusCircledIcon } from '@radix-ui/react-icons';

const CreateCharacter: FC = (): ReactElement => {
  return (
    <FlexContainer
      $justifyContent="center"
      $alignItems="center"
      $height="600px"
      $width="300px"
      $column
    >
      <article>
        <PlusCircledIcon fill="white" width={60} height={60} />
        <p style={{ marginTop: '10px' }}>Create character</p>
      </article>
    </FlexContainer>
  );
};

export default CreateCharacter;
