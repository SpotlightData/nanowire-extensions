import { propOr, curry, append } from 'ramda';

function stringSort(a, b) {
  return a.localeCompare(b);
}

export const propSort = curry((key, a, b) => {
  const aVal = propOr('', key, a);
  const bVal = propOr('', key, b);
  return typeof aVal === 'string' ? stringSort(aVal, bVal) : aVal - bVal;
});

export function generateColumns(columns) {
  return isExpanded => {
    const list = typeof columns === 'function' ? columns(isExpanded) : columns;
    return list.reduce((items, entry) => {
      if (!isExpanded && entry.expandedOnly) {
        return items;
      }
      const { expandedOnly, ...rest } = entry;
      return append(rest, items);
    }, []);
  };
}

export function bytesToReadable(x) {
  let l = 0;
  let n = parseInt(x, 10) || 0;

  while (n >= 1024) {
    n /= 1024;
    l += 1;
  }
  const rounded = n.toFixed(n >= 10 || l < 1 ? 0 : 1);
  return `${rounded} ${SIZE_UNITS[l]}`;
}
