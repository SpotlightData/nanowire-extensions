import { propOr, curry } from 'ramda';

function stringSort(a, b) {
  return a.localeCompare(b);
}

export const propSort = curry((key, a, b) => {
  const aVal = propOr('', key, a);
  const bVal = propOr('', key, b);
  return typeof aVal === 'string' ? stringSort(aVal, bVal) : aVal - bVal;
});
