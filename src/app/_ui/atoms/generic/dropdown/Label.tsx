'use client';

import { styled } from '@/lib/configs/stitches.config';
import { DropdownMenu } from 'radix-ui';

const Label = styled(DropdownMenu.Label, {
  padding: '25px',
  fontSize: '12px',
  lineHeight: '25px',
});

export default Label;
