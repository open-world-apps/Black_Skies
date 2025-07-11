import React, { FC, ReactElement } from 'react';

import Container from 'ui/atoms/Container';
import Flash from 'ui/atoms/Flash';
import StrobingEllip from './StrobingEllip';

const Loading: FC = (): ReactElement => (
  <Container
    $position="absolute"
    style={{
      top: '50%',
      left: '50%',
      zIndex: '1',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      pointerEvents: 'none',
    }}
  >
    <Flash>Loading</Flash>
    <StrobingEllip />
  </Container>
);

export default Loading;
