'use client'

import { keyframes, styled } from "@/lib/configs/stitches.config"
import { Dialog } from "radix-ui"
import { blackA } from '@radix-ui/colors'

const overlayShow = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
});

const Overlay = styled(Dialog.Overlay, {
  background: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`
});

export default Overlay;
