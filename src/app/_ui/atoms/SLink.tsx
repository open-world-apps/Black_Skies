'use client';

import styled, { css } from 'styled-components';
import Link from 'next/link';

interface SLinkProps {
  $underline?: boolean;
}

const SLink = styled(Link)<SLinkProps>`
  text-decoration: none;

  &:hover {
    color: Green;
    text-decoration: none;
  }

  ${props =>
    props.$underline &&
    css`
      &:hover {
        text-decoration: underline;
      }
    `}
`;

export default SLink;
