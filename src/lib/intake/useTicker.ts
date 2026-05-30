'use client';

import { useEffect, useState } from 'react';

// Increments a counter on an interval — drives the "live" online count.
export const useTicker = (
  initial: number,
  step: () => number,
  ms = 2000
): number => {
  const [v, setV] = useState(initial);
  useEffect(() => {
    const id = setInterval(() => setV(x => x + step()), ms);
    return () => clearInterval(id);
  }, [step, ms]);
  return v;
};
