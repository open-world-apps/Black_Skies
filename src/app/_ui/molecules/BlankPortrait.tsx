import React, { FC, ReactElement } from 'react';
import portrait from '@@/public/portrait.svg';
import Portrait from 'ui/atoms/Portrait';

const BlankPortrait: FC = (): ReactElement => (
  <>
    <Portrait src={portrait} alt="default portrait" />
  </>
);

export default BlankPortrait;
