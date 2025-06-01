import settings from '../settings.json';

export const formatCurrency = (
  value: number,
  {
    currencyCode = settings.money.defaultCurrency,
    decimalPlaces = 2,
    decimalSeparator = '.',
    symbol = settings.money.defaultSymbol,
    thousandsSeparator = ',',
  } = {}
): string => {
  const parts = Number(value).toFixed(decimalPlaces).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

  const formatted = parts.join(decimalSeparator);

  return `${symbol}${formatted} ${currencyCode.toUpperCase()}`;
};
