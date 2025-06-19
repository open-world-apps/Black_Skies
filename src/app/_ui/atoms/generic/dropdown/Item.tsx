'use client';

import { styled } from '@/lib/configs/stitches.config';
import { DropdownMenu } from 'radix-ui';
import { item } from './sharedStyles';

const Item = styled(DropdownMenu.Item, {
  ...item
});

export default Item;
