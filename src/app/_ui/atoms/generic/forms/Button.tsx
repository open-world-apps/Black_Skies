'use client';

import { styled } from '@/lib/configs/stitches.config';

const Button = styled(
  'button',
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '13px',
    border: 'none',
    fontSize: '15px',
    fontWeight: '500',
    width: '100%',
    backgroundColor: 'rgba(91, 110, 20)',
    color: 'Black',
  },
  {
    '&:hover': {
      cursor: 'pointer',
    },
    '&:focus': {
      boxShadow: '0 0 0 2px black',
    },
  }
);

export default Button;
