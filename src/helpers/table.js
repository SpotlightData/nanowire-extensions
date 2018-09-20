import * as R from 'ramda';
import { keyToAccessor } from '../internal/functions';
import { Icon } from 'antd';

function stringSort(a, b) {
  return a.localeCompare(b);
}

export const iconProps = {
  enabled: {
    type: 'check-circle',
    style: { color: 'green' },
  },
  disabled: {
    type: 'close-circle',
    style: { color: 'red' },
  },
};

export const statusToValue = status => (status === 'enabled' ? 1 : 0);

export function statusSort(key) {
  const accessor = keyToAccessor(key);
  const convert = val => statusToValue(accessor(val));
  return (a, b) => {
    return convert(a) - convert(b);
  };
}

export function statusRender(type) {
  return <Icon {...iconProps[type]} />;
}

export function propSort(key) {
  const accessor = keyToAccessor(key);
  return (a, b) => {
    const aVal = accessor(a);
    const bVal = accessor(b);
    return typeof aVal === 'string' ? stringSort(aVal, bVal) : aVal - bVal;
  };
}

export function generateColumns(columns) {
  return isExpanded => {
    const list = typeof columns === 'function' ? columns(isExpanded) : columns;
    return list.reduce((items, entry) => {
      if (!isExpanded && entry.expandedOnly) {
        return items;
      }
      const { expandedOnly, ...rest } = entry;
      return R.append(rest, items);
    }, []);
  };
}

export const SIZE_UNITS = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export function bytesToReadableBare(units) {
  return x => {
    let l = 0;
    let n = parseInt(x, 10) || 0;

    while (n >= 1024) {
      n /= 1024;
      l += 1;
    }
    const rounded = n.toFixed(n >= 10 || l < 1 ? 0 : 1);
    return `${rounded} ${units[l]}`;
  };
}

export const bytesToReadable = bytesToReadableBare(SIZE_UNITS);
