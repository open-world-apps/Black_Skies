'use client';

import { styled } from '@/lib/configs/stitches.config';
import { Avatar } from 'radix-ui';

const AvatarRoot = styled(Avatar.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  width: '35px',
  height: '35px',
  borderRadius: '100%',
  backgroundColor: 'black',
  margin: '3px 50px 0 0',

  '&:hover': {
    cursor: 'pointer',
  },
});

export default AvatarRoot;
