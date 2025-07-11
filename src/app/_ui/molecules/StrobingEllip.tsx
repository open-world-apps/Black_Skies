import React, { FC, ReactElement } from 'react';
import Strobe from 'ui/atoms/Strobe';

export const StrobingEllip: FC = (): ReactElement => {
  return (
    <Strobe>
      <Strobe className="dot one">.</Strobe>
      <Strobe className="dot two">.</Strobe>
      <Strobe className="dot three">.</Strobe>
    </Strobe>
  );
};

export default StrobingEllip;
