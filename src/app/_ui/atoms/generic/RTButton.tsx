'use client';

import { Color, Height, Width } from '@/lib/types';
import styled from 'styled-components';

interface Props {
  height?: Height;
  width?: Width;
  $hoverColor?: Color;
  $hoverFontColor?: Color;
}

export const RTButton = styled.button<Props>`
  height: ${({ height }) => height ?? 'fit-content'};
  width: ${({ width }) => width ?? 'initial'};
  padding: 10px;
  background: rgba(0, 0, 0, 0);
  color: white;
  border-radius: 100px;
  border: 1px solid white;

  &:hover {
    background: rgba(156, 163, 150, 0.4);
    color: yellow;
  }
`;

export const RTInfoButton = styled.button<Props>`
  height: ${({ height }) => height ?? 'fit-content'};
  width: ${({ width }) => width ?? 'initial'};
  padding: 10px;
  background: rgba(0, 0, 0, 0);
  color: white;
  border-radius: 100px;
  border: 1px solid white;

  &:hover {
    background: rgba(11, 1, 97, 0.9);
    color: yellow;
  }
`;

export default RTButton;
