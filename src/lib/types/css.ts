type CSSDefaults = 'initial' | 'inherit' | 'auto' | 'normal' | 'legacy';
type CSSFlexDefaults =
  | 'safe'
  | 'unsafe'
  | 'start'
  | 'end'
  | 'center'
  | 'normal';
type CSSFlexSpacing = 'space-around' | 'space-between' | 'space-evenly';
type CSSFlexBaseline = 'baseline' | 'first baseline' | 'last baseline';

export type CSSUnit = 'px' | '%' | 'vw' | 'vh' | 'pt' | 'pc';

export type CSSSize = `${number}${CSSUnit}` | number | CSSDefaults;

export type CSSContainerSizing =
  | `${number}${CSSUnit}`
  | 'fit-content'
  | CSSDefaults;

export type CSSDirection =
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse'
  | CSSDefaults;

export type CSSFlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | CSSDefaults;

export type CSSFlexAlignItems =
  | CSSFlexDefaults
  | CSSDefaults
  | CSSFlexBaseline
  | 'self-start'
  | 'self-end'
  | 'anchor-center'
  | 'flex-start'
  | 'flex-end';

export type CSSFlexAlignSelf =
  | 'auto'
  | 'self-start'
  | 'self-end'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'anchor-center'
  | 'safe'
  | 'unsafe'
  | CSSFlexBaseline
  | CSSDefaults;

export type CSSFlexAlignContent =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'self-start'
  | 'self-end'
  | CSSFlexBaseline
  | CSSFlexSpacing
  | CSSFlexDefaults
  | CSSDefaults;

export type BorderStyle =
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'
  | 'none'
  | 'hidden'
  | CSSDefaults;

export type RGB = `rgb(${number},${number},${number})`;
export type RGBA = `rgba(${number},${number},${number},${number})`;
export type HEX = `#${string}${number}`;
export type CSSColor = RGB | RGBA | HEX;

export type CSSBorder = `${CSSSize} ${BorderStyle} ${CSSColor | string}`;
