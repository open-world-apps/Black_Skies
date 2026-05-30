'use client';

import { useEffect, useState } from 'react';

// Reveals a string char-by-char. Returns [shownText, done].
export const useTypewriter = (
  text: string,
  { speed = 24, start = true, delay = 0 }: { speed?: number; start?: boolean; delay?: number } = {}
): [string, boolean] => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setN(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, start, delay]);
  return [text.slice(0, n), n >= text.length];
};
