'use client';

import { styled } from '@/lib/configs/stitches.config';
import { DropdownMenu } from 'radix-ui';
import { item } from './sharedStyles';

const SubTrigger = styled(DropdownMenu.SubTrigger, {
  ...item,

  '&[data-state="open"]': {
    backgroundColor: 'Violet',
    color: 'Violet',
  },
});

export default SubTrigger;
