'use client';

import { styled } from '@/lib/configs/stitches.config';
import { Avatar } from 'radix-ui';

const AvatarFallback = styled(Avatar.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  color: 'white',
  fontSize: '15px',
  lineHeight: '1',
  fontWeight: '500',
});

export default AvatarFallback;
