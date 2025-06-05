'use client';

import { styled } from '@/lib/configs/stitches.config';

const RTButton = styled('button', {
  width: '150px',
  padding: '10px',
  background: 'rgba(0, 0, 0, 0)',
  color: 'White',
  borderRadius: '100px',
  border: '1px solid white',
  '&:hover': {
    background: 'rgba(156, 163, 150, 0.4)',
    color: 'Yellow',
    cursor: 'pointer',
  },
});

const RTInfoButton = styled(RTButton, {
  '&:hover': {
    background: 'rgba(11, 1, 97, 0.9)',
    color: 'Yellow',
    cursor: 'pointer',
  },
});

export default RTButton;
