'use client';

import { ContainerSizing } from '@/lib/types';
import styled from 'styled-components';

interface Props {
  display?: 'block' | 'inline' | 'inline block';
  height?: ContainerSizing;
  width?: ContainerSizing;
}

const Container = styled.div<Props>`
  display: ${({ display }) => display ?? 'block'};
  height: ${({ height }) => height ?? 'initial'};
  width: ${({ width }) => width ?? 'initial'};
`;

export default Container;
