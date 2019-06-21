import * as R from 'ramda';
import { Dictionary } from '../interfaces';

export function toDictionary<T>(array: T[], key: string): Dictionary<T> {
  return R.reduce(
    (dict: Dictionary<T>, entry: T) => {
      dict[entry[key]] = entry;
      return entry;
    },
    {},
    array
  );
}

export function hasLength<T>(length: number, array: Array<T>) {
  if (typeof length !== 'number') {
    throw new TypeError('length is not a number');
  }
  const actual = R.propOr<number, Array<T>, number>(-1, 'length', array);
  return actual === length;
}
