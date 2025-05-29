'use client';

import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useState,
} from 'react';
import { AnimatedArrow } from '../atoms/generic/Arrow';
import { ClickableSpan } from '../atoms/generic/Span';

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ArrowToggleSpan: FC<Props> = ({ setOpen }): ReactElement => {
  const [direction, setDirection] = useState<'right' | 'down'>('right');

  const toggleDirection = () => {
    setDirection(prev => (prev === 'right' ? 'down' : 'right'));
    setOpen(prev => (!prev ? true : false));
  };

  return (
    <>
      <ClickableSpan
        $alignItems="center"
        $justifyContent="center"
        $margin="15px"
        $flex
        $onClick={toggleDirection}
      >
        <AnimatedArrow $direction={direction} />
      </ClickableSpan>
    </>
  );
};

export default ArrowToggleSpan;
