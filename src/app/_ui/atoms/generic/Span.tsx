'use client';

import styled from 'styled-components';

import { CSSSize } from '@/lib/types/css';

interface SpanProps {
  $background?: string;
  $border?: string;
  $borderRadius?: CSSSize;
  $height?: CSSSize;
  $width?: CSSSize;
  $margin?: string;
  $padding?: string;
  $overflowHidden?: boolean;
}

const Span = styled.span.attrs<SpanProps>(props => ({
  $background: props.$background,
  $border: props.$border,
  $borderRadius: props.$borderRadius,
  $height: props.$height,
  $width: props.$width,
  $margin: props.$margin,
  $padding: props.$padding,
  $overflowHidden: props.$overflowHidden,
}))`
  background: ${({ $background }) => $background};
  border: ${({ $border }) => $border};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding};
  ${({ $overflowHidden }) => $overflowHidden && 'overflow: hidden;'}
`;

export default Span;
