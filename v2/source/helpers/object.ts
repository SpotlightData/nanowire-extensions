import * as R from 'ramda';
import { Dictionary } from '../interfaces';

export function filterObject<T>(
  object: Dictionary<T>,
  predicate: (key: string, entry: T) => boolean
): Dictionary<T> {
  return R.pipe(
    R.toPairs,
    R.reduce((acc: Dictionary<T>, [key, value]: [string, T]) => {
      if (predicate(key, value)) {
        acc[key] = value;
      }
      return acc;
    }, {})
  )(object);
}
