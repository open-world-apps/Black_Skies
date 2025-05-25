'use client';

import styled from 'styled-components';

interface Props {
  display?: 'block' | 'inline' | 'inline block';
  height?: number | string | 'fit-content' | 'initial' | 'inherit';
  width?: number | string | 'fit-content' | 'initial' | 'inherit';
}

const Container = styled.div<Props>`
  display: ${({ display }) => display ?? 'block'};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : (height ?? 'fit-content')};
  width: ${({ width }) =>
    typeof width === 'number' ? `${width}px` : (width ?? 'fit-content')};
`;

export default Container;
