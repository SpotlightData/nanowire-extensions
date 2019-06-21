import * as React from 'react';
import * as R from 'ramda';
import { keyToAccessor, AccessorKey } from './functions';
import { Icon } from 'antd';

function stringSort(a: string, b: string) {
  return a.localeCompare(b);
}

export type Status = 'enabled' | 'disabled';

export const statusToValue = (status: Status) => (status === 'enabled' ? 1 : 0);
export function statusIconProps(status: Status) {
  switch (status) {
    case 'enabled':
      return {
        type: 'check-circle',
        style: { color: 'green' },
      };
    case 'disabled':
      return {
        type: 'close-circle',
        style: { color: 'red' },
      };
    default:
      throw new TypeError(`Invalid status passed: ${status}`);
  }
}

export function statusSort<T>(key: AccessorKey) {
  const accessor = keyToAccessor<T, Status>(key);
  const convert = (val: T) => statusToValue(accessor(val));
  return (a: T, b: T) => {
    return convert(a) - convert(b);
  };
}

export function statusRender(type: Status) {
  return <Icon {...statusIconProps(type)} />;
}

export function propSort<T>(key: AccessorKey) {
  const accessor = keyToAccessor<T, string | number>(key);
  return (a: T, b: T) => {
    const aVal = accessor(a);
    const bVal = accessor(b);

    // In here we copy paste typeof because it helps typescript to validate types
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return stringSort(aVal, bVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return aVal - bVal;
    }
    throw new TypeError(
      `Expected values to be (number | string), received: (${typeof aVal}, ${typeof bVal})`
    );
  };
}

export type Columns<T> = T[] | ((isExpanded: boolean) => T[]);

export function generateColumns<T extends { expandedOnly: boolean }>(columns: Columns<T>) {
  return (isExpanded: boolean): T[] => {
    const list = typeof columns === 'function' ? columns(isExpanded) : columns;
    return list.reduce((items, entry: T) => {
      if (!isExpanded && entry.expandedOnly) {
        return items;
      }
      const { expandedOnly, ...rest } = entry;
      items.push(rest);
      return items;
    }, []);
  };
}
