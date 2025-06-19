'use client';

import { styled } from '@/lib/configs/stitches.config';
import { DropdownMenu } from 'radix-ui';

const ItemIndicator = styled(DropdownMenu.ItemIndicator, {
  position: 'absolute',
  left: '0',
  width: '25px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default ItemIndicator;
