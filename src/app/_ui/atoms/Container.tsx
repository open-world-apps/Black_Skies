'use client';

import styled from 'styled-components';
import { CSSContainerSizing, CSSColor, CSSBoxSizing } from '@/lib/types/css';

interface ContainerProps {
  $display?: 'block' | 'inline' | 'inline block';
  $color?: CSSColor;
  $height?: CSSContainerSizing;
  $width?: CSSContainerSizing;
  $border?: CSSBoxSizing;
  $margin?: CSSBoxSizing;
  $marginTop?: CSSBoxSizing;
  $marginRight?: CSSBoxSizing;
  $marginBottom?: CSSBoxSizing;
  $marginLeft?: CSSBoxSizing;
  $padding?: CSSBoxSizing;
  $background?: string;
  $alignSelf?: string;
  $justifySelf?: string;
}

const Container = styled.div.attrs<ContainerProps>(props => ({
  $display: props.$display || 'block',
  $color: props.$color,
  $height: props.$height || 'fit-content',
  $width: props.$width || 'fit-content',
  $border: props.$border,
  $margin: props.$margin,
  $marginTop: props.$marginTop,
  $marginRight: props.$marginRight,
  $marginBottom: props.$marginBottom,
  $marginLeft: props.$marginLeft,
  $padding: props.$padding,
  $background: props.$background,
  $alignSelf: props.$alignSelf,
  $justifySelf: props.$justifySelf,
}))`
  display: ${props => props.$display};
  color: ${props => props.$color};
  height: ${props => props.$height};
  width: ${props => props.$width};
  border: ${props => props.$border};
  margin: ${props => props.$margin};
  margintop: ${props => props.$marginTop};
  marginright: ${props => props.$marginRight};
  marginbottom: ${props => props.$marginBottom};
  marginleft: ${props => props.$marginLeft};
  padding: ${props => props.$padding};
  background: ${props => props.$background};
  align-self: ${props => props.$alignSelf};
  justify-self: ${props => props.$justifySelf};
`;

export default Container;
