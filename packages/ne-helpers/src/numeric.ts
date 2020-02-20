export function percentage(count: number, value: number, roundTo: number = 0) {
  const percent = (count / value) * 100;
  const roundN = Math.pow(10, roundTo);
  return Math.round((percent + Number.EPSILON) * roundN) / roundN;
}
