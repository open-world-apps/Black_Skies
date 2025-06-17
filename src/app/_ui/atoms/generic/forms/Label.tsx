'use client';

import { styled } from '@/lib/configs/stitches.config';
import { Label as _Label } from '@radix-ui/react-form';

const Label = styled(_Label, {
  fontSize: '15px',
  fontWeight: '500',
  lineHeight: '35px',
  color: 'White',
});

export default Label;
