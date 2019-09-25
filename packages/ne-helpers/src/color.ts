const primaryColors = [
  '#fbb4ae',
  '#b3cde3',
  '#ccebc5',
  '#decbe4',
  '#fed9a6',
  '#ffffcc',
  '#e5d8bd',
  '#fddaec',
  '#f2f2f2',
];

const secondaryColors = [
  '#69d2e7',
  '#a7dbd8',
  '#e0e4cc',
  '#f38630',
  '#fa6900',
  '#fe4365',
  '#fc9d9a',
  '#f9cdad',
  '#c8c8a9',
  '#83af9b',
  '#ecd078',
  '#d95b43',
  '#c02942',
  '#556270',
  '#4ecdc4',
  '#c7f464',
  '#ff6b6b',
  '#c44d58',
  '#774f38',
  '#e08e79',
  '#f1d4af',
  '#ece5ce',
  '#c5e0dc',
  '#e8ddcb',
  '#cdb380',
  '#036564',
  '#033649',
  '#031634',
];

function inRange(index: number, colors: string[]): string {
  return colors[index % colors.length];
}

export function getPrimaryHighlightColor(index: number): string {
  return inRange(index, primaryColors);
}

export function getSecondaryHighlightColor(index: number): string {
  return inRange(index, secondaryColors);
}
