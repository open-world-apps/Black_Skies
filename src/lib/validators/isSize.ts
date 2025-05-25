const isSize = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;

  return /^\d+(rem|em|px|pc|pt|%|vh|vw)$/.test(value);
};

export default isSize;
