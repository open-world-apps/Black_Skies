'use client';

import { } from 'react';
import styled from 'styled-components';

interface HintProps {
  error?: string | false | null;
  ok?: string | false | null;
}

const Line = styled.span<{ $color: string }>`
  min-height: 14px;
  font-family: var(--bs-mono);
  font-size: 10.5px;
  letter-spacing: 0.04em;
  line-height: 1.3;
  color: ${({ $color }) => $color};
`;

const Hint = ({ error, ok }: HintProps) => {
  const color = error ? '#e06a55' : ok ? 'var(--bs-accent2)' : 'transparent';
  return (
    <Line $color={color}>{error ? '// ' + error : ok ? '// ' + ok : '·'}</Line>
  );
};

export default Hint;
