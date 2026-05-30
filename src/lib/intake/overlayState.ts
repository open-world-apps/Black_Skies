'use client';

import { useEffect } from 'react';

// Tiny shared signal: how many blur-backed modal overlays are currently open.
// The Starfield canvas subscribes and pauses its animation while any overlay is
// up — a full-viewport backdrop-filter blur over a 60fps canvas forces a
// per-frame re-blur of the whole backdrop, which can exhaust renderer memory
// (especially without GPU acceleration). Freezing the canvas removes the storm.

let count = 0;
const subscribers = new Set<() => void>();

const notify = () => subscribers.forEach(fn => fn());

export const openOverlay = (): void => {
  count += 1;
  notify();
};

export const closeOverlay = (): void => {
  count = Math.max(0, count - 1);
  notify();
};

export const isOverlayOpen = (): boolean => count > 0;

export const subscribeOverlay = (fn: () => void): (() => void) => {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
};

// Modals call this on mount to register themselves as an open overlay.
export const useOverlayLock = (): void => {
  useEffect(() => {
    openOverlay();
    return () => closeOverlay();
  }, []);
};
