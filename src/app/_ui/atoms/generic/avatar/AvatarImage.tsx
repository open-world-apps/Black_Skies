'use client';

import { styled } from '@/lib/configs/stitches.config';
import { Avatar } from 'radix-ui';

const AvatarImage = styled(Avatar.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});

export default AvatarImage;
