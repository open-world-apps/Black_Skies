'use client';

import { styled } from '@/lib/configs/stitches.config';
import { DropdownMenu } from 'radix-ui';

const Separator = styled(DropdownMenu.Separator, {
  height: '1px',
  backgroundColor: 'Violet',
  margin: '5px',
});

export default Separator;
