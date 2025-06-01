'use client';

import styled from 'styled-components';
import Link from 'next/link';

interface Props {
  $noUnderline?: boolean;
}

const SLink = styled(Link)<Props>`
  text-decoration: none;

  &:hover {
    color: green;
    text-decoration: ${({ $noUnderline }) =>
      !$noUnderline ? 'underline' : 'none'};
  }
`;

export default SLink;
