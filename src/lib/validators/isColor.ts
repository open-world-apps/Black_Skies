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
  'Alice Blue',
  'Antique White',
  'Aqua',
  'Aquamarine',
  'Azure',
  'Beige',
  'Bisque',
  'Black',
  'Blanched Almond',
  'Blue',
  'Blue Violet',
  'Brown',
  'Burly Wood',
  'Cadet Blue',
  'Chartreuse',
  'Chocolate',
  'Coral',
  'Cornflower Blue',
  'Cornsilk',
  'Crimson',
  'Cyan',
  'Dark Blue',
  'Dark Cyan',
  'Dark Golden Rod',
  'Dark Gray',
  'Dark Green',
  'Dark Khaki',
  'Dark Magenta',
  'Dark Olive Green',
  'Dark Orange',
  'Dark Orchid',
  'Dark Red',
  'Dark Salmon',
  'Dark Sea Green',
  'Dark Slate Blue',
  'Dark Slate Gray',
  'Dark Turquoise',
  'Dark Violet',
  'Deep Pink',
  'Deep Sky Blue',
  'Dim Gray',
  'Dodger Blue',
  'Fire Brick',
  'Floral White',
  'Forest Green',
  'Fuchsia',
  'Gainsboro',
  'Ghost White',
  'Gold',
  'Golden Rod',
  'Gray',
  'Green',
  'Green Yellow',
  'Honey Dew',
  'Hot Pink',
  'Indian Red',
  'Indigo',
  'Ivory',
  'Khaki',
  'Lavender',
  'Lavender Blush',
  'Lawn Green',
  'Lemon Chiffon',
  'Light Blue',
  'Light Coral',
  'Light Cyan',
  'Light Golden Rod Yellow',
  'Light Gray',
  'Light Green',
  'Light Pink',
  'Light Salmon',
  'Light Sea Green',
  'Light Sky Blue',
  'Light Slate Gray',
  'Light Steel Blue',
  'Light Yellow',
  'Lime',
  'Lime Green',
  'Linen',
  'Magenta',
  'Maroon',
  'Medium Aqua Marine',
  'Medium Blue',
  'Medium Orchid',
  'Medium Purple',
  'Medium Sea Green',
  'Medium Slate Blue',
  'Medium Spring Green',
  'Medium Turquoise',
  'Medium Violet Red',
  'Midnight Blue',
  'Mint Cream',
  'Misty Rose',
  'Moccasin',
  'Navajo White',
  'Navy',
  'Old Lace',
  'Olive',
  'Olive Drab',
  'Orange',
  'Orange Red',
  'Orchid',
  'Pale Golden Rod',
  'Pale Green',
  'Pale Turquoise',
  'Pale Violet Red',
  'Papaya Whip',
  'Peach Puff',
  'Peru',
  'Pink',
  'Plum',
  'Powder Blue',
  'Purple',
  'Rebecca Purple',
  'Red',
  'Rosy Brown',
  'Royal Blue',
  'Saddle Brown',
  'Salmon',
  'Sandy Brown',
  'Sea Green',
  'Sea Shell',
  'Sienna',
  'Silver',
  'Sky Blue',
  'Slate Blue',
  'Slate Gray',
  'Snow',
  'Spring Green',
  'Steel Blue',
  'Tan',
  'Teal',
  'Thistle',
  'Tomato',
  'Turquoise',
  'Violet',
  'Wheat',
  'White',
  'White Smoke',
  'Yellow',
  'Yellow Green',
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
