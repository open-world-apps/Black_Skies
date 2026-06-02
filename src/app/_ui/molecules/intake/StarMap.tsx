'use client';

import { FC, Fragment } from 'react';
import styled from 'styled-components';

import { SpawnNode } from '@/lib/intake/types';

interface StarMapProps {
  nodes: SpawnNode[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
}

const nodeColor = (n: SpawnNode): string => {
  if (n.home) return n.accent === 'a' ? 'var(--bs-accent)' : 'var(--bs-accent2)';
  if (n.risk >= 4) return '#d8533f';
  if (n.risk >= 3) return 'var(--bs-accent)';
  return 'var(--bs-accent2)';
};

const Frame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 4;
  border: 1px solid var(--bs-line);
  background: radial-gradient(
    80% 60% at 50% 50%,
    rgba(63, 185, 201, 0.05),
    rgba(5, 6, 10, 0.4)
  );
  overflow: hidden;
`;

const Svg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const NodeBtn = styled.button<{ $x: number; $y: number }>`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y * 0.8}%;
  transform: translate(-50%, -50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
`;

const NodeCore = styled.span`
  display: block;
  position: relative;
`;

const Halo = styled.span<{ $col: string; $sel: boolean }>`
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  border: 1px solid ${({ $col }) => $col};
  opacity: ${({ $sel }) => ($sel ? 0.6 : 0.2)};
  box-shadow: ${({ $sel, $col }) => ($sel ? `0 0 24px -2px ${$col}` : 'none')};
  transition: all 0.25s;
`;

const Core = styled.span<{ $col: string; $sel: boolean }>`
  display: block;
  width: ${({ $sel }) => ($sel ? 12 : 9)}px;
  height: ${({ $sel }) => ($sel ? 12 : 9)}px;
  border-radius: 50%;
  background: ${({ $col }) => $col};
  box-shadow: 0 0 12px ${({ $col }) => $col};
  transition: all 0.25s;
`;

const HomeTag = styled.span<{ $col: string }>`
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--bs-mono);
  font-size: 8px;
  letter-spacing: 0.18em;
  color: ${({ $col }) => $col};
  white-space: nowrap;
`;

const NodeLabel = styled.span<{ $sel: boolean }>`
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--bs-mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  color: ${({ $sel }) => ($sel ? '#fff' : 'var(--bs-ink-dim)')};
  white-space: nowrap;
  text-shadow:
    0 0 8px #05060a,
    0 0 8px #05060a;
`;

const CornerTL = styled.div`
  position: absolute;
  top: 10px;
  left: 12px;
  font-family: var(--bs-mono);
  font-size: 9px;
  letter-spacing: 0.18em;
  color: var(--bs-ink-dim);
`;

const CornerTR = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  font-family: var(--bs-mono);
  font-size: 9px;
  letter-spacing: 0.18em;
  color: var(--bs-accent);
`;

const StarMap = ({ nodes, selectedKey, onSelect }: StarMapProps) => {
  const lines: { a: SpawnNode; b: SpawnNode }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
      if (d2 < 1700) lines.push({ a, b });
    }
  }

  return (
    <Frame>
      <Svg viewBox="0 0 100 80" preserveAspectRatio="none">
        {Array.from({ length: 40 }).map((_, i) => {
          const seed = i * 9301 + 49297;
          const x = (seed % 1000) / 10;
          const y = ((seed / 7) % 800) / 10;
          const r = (i % 3) * 0.15 + 0.18;
          return <circle key={i} cx={x} cy={y} r={r} fill="rgba(220,230,255,0.4)" />;
        })}
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.a.x}
            y1={l.a.y * 0.8}
            x2={l.b.x}
            y2={l.b.y * 0.8}
            stroke="rgba(150,170,190,0.12)"
            strokeWidth="0.15"
            strokeDasharray="0.6 0.6"
          />
        ))}
        {[20, 40, 60, 80].map(v => (
          <Fragment key={v}>
            <line x1={v} y1={0} x2={v} y2={80} stroke="rgba(150,170,190,0.05)" strokeWidth="0.1" />
            <line x1={0} y1={v * 0.8} x2={100} y2={v * 0.8} stroke="rgba(150,170,190,0.05)" strokeWidth="0.1" />
          </Fragment>
        ))}
      </Svg>

      {nodes.map(n => {
        const sel = n.key === selectedKey;
        const col = nodeColor(n);
        return (
          <NodeBtn key={n.key} type="button" onClick={() => onSelect(n.key)} $x={n.x} $y={n.y}>
            <NodeCore>
              <Halo $col={col} $sel={sel} />
              <Core $col={col} $sel={sel} />
              {n.home && <HomeTag $col={col}>★ HOME</HomeTag>}
            </NodeCore>
            <NodeLabel $sel={sel}>{n.label}</NodeLabel>
          </NodeBtn>
        );
      })}

      <CornerTL>SAGITTARIUS REACH · NAV CHART</CornerTL>
      <CornerTR>● {nodes.length} NODES</CornerTR>
    </Frame>
  );
};

export default StarMap;
