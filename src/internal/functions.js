import * as R from 'ramda';

export function keyToAccessor(key) {
  if (Array.isArray(key)) {
    return R.path(key);
  } else if (typeof key === 'string' || typeof key === 'number') {
    return entry => entry[key];
  }
  return key;
}
