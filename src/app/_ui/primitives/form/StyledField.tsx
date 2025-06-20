'use client';

import { styled } from '@/lib/configs/stitches.config';
import { Field as _Field } from '@radix-ui/react-form';

const StyledField = styled(_Field, {
  display: 'flex',
  flexDirection: 'column',
  height: '97px',
  width: '100%',
});

export default StyledField;
