'use client'

import { styled } from '@/lib/configs/stitches.config';
import Container from '../Container';

const RightSlot = styled(Container, {
  marginLeft: 'auto',
  paddingLeft: '20px',
  color: 'Violet',

  '[data-highlighted] > &': {
    color: 'White',
  },
  '[data-disabled] &': {
    color: 'Violet',
  },
});

export default RightSlot;
