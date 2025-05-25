const isHexColor = (value: string): boolean => {
  const pattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  return pattern.test(value);
};

const isRgbColor = (value: string): boolean => {
  const pattern = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

  return pattern.test(value);
};

const isRgbaColor = (value: string): boolean => {
  const pattern =
    /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*, \s*(0|1|0?\. \d+)\s*\)$/;

  return pattern.test(value);
};

const isHslColor = (value: string): boolean => {
  const pattern = /^hsl\(\s*\d+\s*, \s*\d+%\s*,\s*\d+%\s*\)$/;

  return pattern.test(value);
};

const isHslaColor = (value: string): boolean => {
  const pattern =
    /^hsla\(\s*\d+\s*, \s*\d+%\s*,\s*\d+%\s*, \s*(0|1|0?\.\d+)\s*\)$/;

  return pattern.test(value);
};

const namedColors = new Set([
  'black',
  'white',
  'red',
  'green',
  'blue',
  'yellow',
  'cyan',
  'magenta',
  'gray',
  'grey',
  'orange',
  'purple',
  'pink',
  'brown',
  'lime',
  'teal',
  'navy',
  'olive',
  'maroon',
]);

const isNamedColor = (value: string): boolean =>
  namedColors.has(value.toLowerCase());

const isColor = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;

  return (
    isHexColor(value) ||
    isRgbColor(value) ||
    isRgbaColor(value) ||
    isHslColor(value) ||
    isHslaColor(value) ||
    isNamedColor(value)
  );
};

export default isColor;
