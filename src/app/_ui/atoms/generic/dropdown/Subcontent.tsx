'use client';

import { DropdownMenu } from 'radix-ui';
import { content } from './sharedStyles';
import { styled } from '@/lib/configs/stitches.config';

const Subcontent = styled(DropdownMenu.SubContent, {
  ...content,
});

export default Subcontent;
