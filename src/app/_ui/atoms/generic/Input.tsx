'use client';

import { styled } from '@/lib/configs/stitches.config';
import { violet } from '@radix-ui/colors';

const Input = styled('input', {
  all: 'unset',
  width: '100%',
  height: '15px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  fontSize: '15px',
  lineHeight: 1,
  color: violet.violet11,
  padding: '10px',
  boxShadow: `0 0 0 1px ${violet.violet7}`,

  '&.flex': {
    flex: 1,
  },
  '&:focus': {
    boxShadow: `0 0 0 2px ${violet.violet8}`,
  },
});

export default Input;
