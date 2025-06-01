'use client';

import { ContainerSizing } from '@/lib/types';
import styled from 'styled-components';

interface Props {
  $display?: 'block' | 'inline' | 'inline block';
  height?: ContainerSizing;
  width?: ContainerSizing;
  $border?: string;
  $margin?: string;
  $padding?: string;
}

const Container = styled.div<Props>`
  display: ${({ $display }) => $display ?? 'block'};
  height: ${({ height }) => height ?? 'fit-content'};
  width: ${({ width }) => width ?? 'fit-content'};
  ${({ $margin }) => `margin: ${$margin};`}
  ${({ $border }) => $border && `border: ${$border};`}
  ${({ $padding }) => $padding && `padding: ${$padding};`}
`;

export default Container;
