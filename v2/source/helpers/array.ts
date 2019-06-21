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
