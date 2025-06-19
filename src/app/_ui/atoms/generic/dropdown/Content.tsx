'use client';

import { styled } from '@/lib/configs/stitches.config';
import { DropdownMenu } from 'radix-ui';
import { content } from './sharedStyles';

const Content = styled(DropdownMenu.Content, {
  ...content,
});

export default Content;
