'use client';

import styled from 'styled-components';
import {
  ContainerSizing,
  Color,
  FlexAlignSelf,
  FlexJustify,
  Border,
  BoxSizing,
  Size,
} from '@/lib/types/css';

interface ContainerProps {
  $display?: 'block' | 'inline' | 'inline block';
  $color?: Color;
  $height?: ContainerSizing;
  $width?: ContainerSizing;
  $border?: Border;
  $borderBottom?: Border;
  $margin?: BoxSizing;
  $marginTop?: Size;
  $marginRight?: Size;
  $marginBottom?: Size;
  $marginLeft?: Size;
  $padding?: BoxSizing;
  $position?: string;
  $background?: string;
  $alignSelf?: FlexAlignSelf;
  $justifySelf?: FlexJustify;
}

const Container = styled.div.attrs<ContainerProps>(props => ({
  $display: props.$display || 'block',
  $color: props.$color,
  $height: props.$height || 'fit-content',
  $width: props.$width || 'fit-content',
  $border: props.$border,
  $borderBottom: props.$borderBottom,
  $margin: props.$margin,
  $marginTop: props.$marginTop,
  $marginRight: props.$marginRight,
  $marginBottom: props.$marginBottom,
  $marginLeft: props.$marginLeft,
  $padding: props.$padding,
  $position: props.$position,
  $background: props.$background,
  $alignSelf: props.$alignSelf,
  $justifySelf: props.$justifySelf,
}))`
  display: ${props => props.$display};
  color: ${props => props.$color};
  height: ${props => props.$height};
  width: ${props => props.$width};
  border: ${props => props.$border};
  border-bottom: ${props => props.$borderBottom};
  margin: ${props => props.$margin};
  margin-top: ${props => props.$marginTop};
  margin-right: ${props => props.$marginRight};
  margin-bottom: ${props => props.$marginBottom};
  margin-left: ${props => props.$marginLeft};
  padding: ${props => props.$padding};
  position: ${props => props.$position};
  background: ${props => props.$background};
  align-self: ${props => props.$alignSelf};
  justify-self: ${props => props.$justifySelf};
`;

export default Container;
