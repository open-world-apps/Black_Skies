import React, { FC, ReactElement } from 'react';
import portrait from '@@/public/portrait.svg';
import Portrait from 'ui/atoms/Portrait';
import Container from 'ui/atoms/Container';

const BlankPortrait: FC = (): ReactElement => (
  <Container $alignSelf="flex-end">
    <Portrait src={portrait} alt="default portrait" />
  </Container>
);

export default BlankPortrait;
