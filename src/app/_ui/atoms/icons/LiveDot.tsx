import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

interface DotProps {
  $streaming?: boolean;
  $inactive?: boolean;
}

interface LiveDotProps {
  status?: 'streaming' | 'inactive';
}

const _status = {
  streaming: 'box-shadow: 0 0 8px var(--bs-teal);',
};

const Dot = styled.div<DotProps>`
  display: inline-block;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  background: var(--bs-teal);
  flex-shrink: 0;
  ${props => props.$streaming && _status['streaming']}
`;

/**
 * LiveDot atom — displays a colored dot indicator for live/active status
 */
const LiveDot = ({ status }: LiveDotProps) => {
  const [dotStatus, setDot] = useState<string | undefined>(status);

  useEffect(() => {
    setDot(status);
  }, [status]);

  switch (dotStatus) {
    case 'streaming':
      return <Dot $streaming />;
    case 'inactive':
      return <Dot $inactive />;
    default:
      break;
  }

  return <Dot />;
};

export default LiveDot;
