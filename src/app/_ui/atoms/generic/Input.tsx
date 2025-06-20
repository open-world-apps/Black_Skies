'use client';

import { styled } from '@/lib/configs/stitches.config';
import { violet } from '@radix-ui/colors';

const Input = styled('input', {
  width: '100%',
  height: '35px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  padding: '0 10px',
  fontSize: '15px',
  lineHeight: 1,
  color: violet.violet11,
  boxShadow: `0 0 0 1px ${violet.violet7}`,

  '&.flex': {
    flex: 1,
  }
});

export default Input;
