'use client';

import {
  Size,
  FlexJustify,
  FlexAlignContent,
  FlexAlignItems,
  FlexAlignSelf,
  ContainerSizing,
} from '@/lib/types/css';
import styled from 'styled-components';

interface FlexContainerProps {
  $background?: string;
  $height?: ContainerSizing;
  $width?: ContainerSizing;
  $position?: string;
  $inline?: boolean;
  $row?: boolean;
  $column?: boolean;
  $justifyContent?: FlexJustify;
  $justifyItems?: FlexJustify;
  $justifySelf?: FlexJustify;
  $alignContent?: FlexAlignContent;
  $alignItems?: FlexAlignItems;
  $alignSelf?: FlexAlignSelf;
  $gap?: Size;
  $rowGap?: Size;
  $colGap?: Size;
  $margin?: number | string;
  $marginTop?: Size | number;
  $marginBottom?: Size;
  $marginLeft?: Size;
  $marginRight?: Size;
  $padding?: string | number;
  $overflowHidden?: boolean;
  $top?: '0' | Size;
  $zIndex?: number;
  $border?: string;
  $borderRadius?: Size;
  $boxShadow?: string;
}

const FlexContainer = styled.div.attrs<FlexContainerProps>(props => ({
  $background: props.$background,
  $height: props.$height,
  $width: props.$width,
  $position: props.$position,
  $alignSelf: props.$alignSelf,
  $alignItems: props.$alignItems,
  $alignContent: props.$alignContent,
  $border: props.$border,
  $borderRadius: props.$borderRadius,
  $boxShadow: props.$boxShadow,
  $inline: props.$inline,
  $justifySelf: props.$justifySelf,
  $justifyContent: props.$justifyContent,
  $justifyItems: props.$justifyItems,
  $margin: props.$margin,
  $marginBottom: props.$marginBottom,
  $marginTop: props.$marginTop,
  $marginLeft: props.$marginLeft,
  $marginRight: props.$marginRight,
  $overflowHidden: props.$overflowHidden || false,
  $padding: props.$padding,
  $row: props.$row || false,
  $rowGap: props.$rowGap,
  $colGap: props.$colGap,
  $top: props.$top,
  $zIndex: props.$zIndex,
  $column: props.$column,
}))`
  display: flex;
  background: ${({ $background }) => $background};
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
  padding: ${({ $padding }) => $padding || 0};
  box-shadow: ${({ $boxShadow }) => $boxShadow};
  border: ${({ $border }) => $border};
  border-radius: ${({ $borderRadius }) => $borderRadius};
  margin: ${({ $margin }) => $margin || 0};
  margin-top: ${({ $marginTop }) => $marginTop || 0};
  margin-right: ${({ $marginRight }) => $marginRight || 0};
  margin-bottom: ${({ $marginBottom }) => $marginBottom || 0};
  margin-left: ${({ $marginLeft }) => $marginLeft || 0};
  justify-items: ${({ $justifyItems }) => $justifyItems};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  justify-self: ${({ $justifySelf }) => $justifySelf};
  gap: ${({ $gap }) => $gap};
  row-gap: ${({ $rowGap }) => $rowGap};
  column-gap: ${({ $colGap }) => $colGap};
  position: ${({ $position }) => $position};
  top: ${({ $top }) => $top};
  z-index: ${({ $zIndex }) => $zIndex};
  ${({ $row }) => $row && 'flex-direction: row;'}
  ${({ $column }) => $column && 'flex-direction: column;'}
  ${({ $inline }) => $inline && 'flex-direction: inline-flex;'}
  ${({ $overflowHidden }) => $overflowHidden && 'overflow: hidden;'}
`;

export default FlexContainer;
