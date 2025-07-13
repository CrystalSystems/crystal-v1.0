export const formatLongNumber = (value = 0) =>
  new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
