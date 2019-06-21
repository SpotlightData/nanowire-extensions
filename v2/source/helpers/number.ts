export function makeRoundF(numbers: number) {
  const multiplier = Math.pow(10, numbers);
  return (num: number) => Math.floor(num * multiplier) / multiplier;
}
