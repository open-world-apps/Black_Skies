import { FC, ReactElement } from 'react';

import { GlyphType } from '@/lib/intake/types';

interface GlyphProps {
  type?: GlyphType;
  size?: number;
  c?: string;
  sw?: number;
}

const Glyph: FC<GlyphProps> = ({
  type = 'ring',
  size = 12,
  c = 'currentColor',
  sw = 1.5,
}): ReactElement => {
  const shapes: Record<GlyphType, ReactElement> = {
    ring: <circle cx="8" cy="8" r="5.5" />,
    dot: <circle cx="8" cy="8" r="3" fill={c} stroke="none" />,
    diamond: <rect x="8" y="2.3" width="8" height="8" transform="rotate(45 8 8)" />,
    chevron: <path d="M5 3l5 5-5 5" />,
    cross: (
      <g>
        <path d="M8 1.5v13M1.5 8h13" />
        <circle cx="8" cy="8" r="3.2" />
      </g>
    ),
    bars: (
      <g>
        <path d="M3 12V7M8 12V3M13 12V9" />
      </g>
    ),
    node: (
      <g>
        <circle cx="8" cy="8" r="2.4" fill={c} stroke="none" />
        <circle cx="8" cy="8" r="6" opacity="0.5" />
      </g>
    ),
    arrow: <path d="M3 8h10M9 4l4 4-4 4" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={c}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {shapes[type] || shapes.ring}
    </svg>
  );
};

export default Glyph;
