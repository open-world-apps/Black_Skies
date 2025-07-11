import React, { FC, ReactElement } from 'react';

import AnimatedLoadingIcon from 'ui/atoms/AnimatedLoadingIcon';
import Loading from '../molecules/Loading';
import Container from 'ui/atoms/Container';

const Loader: FC = (): ReactElement => (
  <>
    <Container $position="relative" $width="200px" style={{ aspectRatio: '1' }}>
      <AnimatedLoadingIcon />
      <Loading />
    </Container>
  </>
);

export default Loader;
