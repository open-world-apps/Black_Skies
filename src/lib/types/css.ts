type CSSDefaults = 'initial' | 'inherit';
type FlexDefaults = 'safe' | 'unsafe' | 'start' | 'end' | 'center' | 'normal';
type FlexSpacing = 'space-around' | 'space-between' | 'space-evenly';
type FlexBaseline = 'baseline' | 'first baseline' | 'last baseline';
export type Unit =
  | 'px'
  | '%'
  | 'vw'
  | 'vh'
  | 'pt'
  | 'pc'
  | 'em'
  | 'rem'
  | 'vmax'
  | 'vmin';
export type Size = `${number}${Unit}` | 0 | CSSDefaults;
export type BoxSizing =
  | `${Size}`
  | `${Size} ${Size}`
  | `${Size} ${Size} ${Size}`
  | `${Size} ${Size} ${Size} ${Size}`;

export type ContainerSizing = `${number}${Unit}` | 'fit-content' | CSSDefaults;

export type Direction =
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse'
  | CSSDefaults;

export type FlexJustify =
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

export type FlexAlignItems =
  | FlexDefaults
  | CSSDefaults
  | FlexBaseline
  | 'self-start'
  | 'self-end'
  | 'anchor-center'
  | 'flex-start'
  | 'flex-end';

export type FlexAlignSelf =
  | 'auto'
  | 'self-start'
  | 'self-end'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'anchor-center'
  | 'safe'
  | 'unsafe'
  | 'normal'
  | 'auto'
  | FlexBaseline
  | CSSDefaults;

export type FlexAlignContent =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'self-start'
  | 'self-end'
  | FlexBaseline
  | FlexSpacing
  | FlexDefaults
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
export type Color = RGB | RGBA | HEX;

export type Border = `${Size} ${BorderStyle} ${Color | string}`;
