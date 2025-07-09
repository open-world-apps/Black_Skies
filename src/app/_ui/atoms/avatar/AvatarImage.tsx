'use client';

import styled from 'styled-components';
import { Image } from '@radix-ui/react-avatar';

const AvatarImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  z-index: 2000;
`;

export default AvatarImage;
