'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { isOverlayOpen } from '@/lib/intake/overlayState';

interface StarfieldProps {
  count?: number;
  drift?: number;
  twinkle?: boolean;
  color?: string;
}

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

type Star = { x: number; y: number; r: number; a: number; ph: number; sp: number };

const Starfield = ({
  count = 160,
  drift = 0.015,
  twinkle = true,
  color = '255,255,255',
}: StarfieldProps) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const parent = cv.parentElement;
    if (!ctx || !parent) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      const p = parent.getBoundingClientRect();
      w = p.width;
      h = p.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = w + 'px';
      cv.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2,
        a: Math.random() * 0.6 + 0.2,
        ph: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.6 + 0.2,
      }));
    };

    const draw = () => {
      // Pause while a blur-backed modal is open: re-blurring an animating
      // canvas every frame can crash the renderer (esp. without GPU).
      if (isOverlayOpen() || document.hidden) {
        raf = requestAnimationFrame(draw);
        return;
      }
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.x -= drift * (s.r + 0.3);
        if (s.x < 0) s.x = w;
        const a = twinkle ? s.a * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph)) : s.a;
        ctx.fillStyle = `rgba(${color},${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.283);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    seed();
    draw();
    const ro = new ResizeObserver(seed);
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count, drift, twinkle, color]);

  return <Canvas ref={ref} />;
};

export default Starfield;
