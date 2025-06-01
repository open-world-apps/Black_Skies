import React, { FC, ReactElement } from 'react';
import Container from '../atoms/generic/Container';
import OuterBubble from '../atoms/generic/OuterBubble';
import InnerBubble from '../atoms/generic/InnerBubble';

const Bubble: FC = (): ReactElement => (
  <Container width="35px" height="35px" $margin="3px 50px 0 0" $padding={'4px'}>
    <OuterBubble>
      <InnerBubble />
    </OuterBubble>
  </Container>
);

export default Bubble;
