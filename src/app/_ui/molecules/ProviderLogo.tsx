import React, { FC, ReactElement } from 'react';

import Image from 'next/image';
import Span from 'ui/atoms/generic/Span';
import FlexContainer from 'ui/atoms/generic/FlexContainer';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  svg: any;
  name: string;
}

const ProviderLogo: FC<Props> = ({ svg, name }): ReactElement => (
  <Span
    background="white"
    padding="0"
    borderRadius="20px"
    border="1px solid black"
    height="40px"
    width="40px"
  >
    <FlexContainer justifyContent="center" alignItems="center" height="100%" column>
      <Image src={svg} alt={name} />
    </FlexContainer>
  </Span>
);

export default ProviderLogo;
