'use client';

import styled, { keyframes } from 'styled-components';
import { Overlay as O } from '@radix-ui/react-dialog';
import { blackA } from '@radix-ui/colors';

const overlayShow = keyframes`
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
`;

const Overlay = styled(O)`
  background: ${blackA.blackA9};
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export default Overlay;
