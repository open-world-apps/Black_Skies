'use client';

import { styled } from '@/lib/configs/stitches.config';
import Link from 'next/link';

const SLink = styled(Link, {
  textDecoration: 'none',
  '&:hover': {
    color: 'Green',
    textDecoration: 'none',
  },
  variants: {
    underline: {
      true: {
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  },
});

export default SLink;
