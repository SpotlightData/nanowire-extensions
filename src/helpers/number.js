export const roundToN = d => {
  const multiplier = Math.pow(10, d);
  return num => Math.floor(num * multiplier) / multiplier;
};
