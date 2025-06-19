'use client';

import { styled } from '@/lib/configs/stitches.config';

const IconButton = styled('button', {
  borderRadius: '100%',
  height: '35px',
  width: '35px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  boxShadow: '0 2px 10px black',

  '&:hover': {
    backgroundColor: 'Violet',
  },
  '&:focus': {
    boxShadow: '0 0 0 2px black',
  },
  '& *': {
    all: 'unset',
  },
});

export default IconButton;
