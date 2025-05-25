type CSSDefaults = 'initial' | 'inherit';
export type Height = `${number}vh` | `${number}%` | CSSDefaults | 'fit-content';
export type Width =
  | `${number}vw`
  | `${number}%`
  | `${number}px`
  | CSSDefaults
  | 'fit-content';

type NamedColor =
  | 'black'
  | 'white'
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'cyan'
  | 'magenta'
  | 'gray'
  | 'grey'
  | 'orange'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'lime'
  | 'teal'
  | 'navy'
  | 'olive'
  | 'maroon';

type HexColor = `#${string}`;
type RGBColor = `rgb(${number}, ${number}, ${number})`;
type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;
type HSLColor = `hsl(${number}, ${number}%, ${number}%)`;
type HSLAColor = `hsla(${number}, ${number}%, ${number}%, ${number})`;

export type Color =
  | NamedColor
  | HexColor
  | RGBColor
  | RGBAColor
  | HSLColor
  | HSLAColor;

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
