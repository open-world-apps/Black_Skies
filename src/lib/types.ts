type CSSDefaults = 'initial' | 'inherit';

export type CSSUnit = 'px' | '%' | 'vw' | 'vh' | 'pt' | 'pc';

export type Size = `${number}${CSSUnit}` | CSSDefaults;

export type ContainerSizing =
  | `${number}${CSSUnit}`
  | 'fit-content'
  | CSSDefaults;

export type Direction =
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse'
  | CSSDefaults;

export type FJustify =
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

export type FAlign =
  | 'normal'
  | 'stretch'
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'self-start'
  | 'self-end'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | CSSDefaults;
