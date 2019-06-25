import * as R from 'ramda';

export type AccessorKey = string | number | string[];

export function keyToAccessor<E, R>(key: AccessorKey): (entry: E) => R {
  if (Array.isArray(key)) {
    return R.path(key);
  } else if (typeof key === 'string' || typeof key === 'number') {
    return (entry: E) => entry[key];
  }
  return key;
}
