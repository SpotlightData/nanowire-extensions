import * as R from 'ramda';
import { Dictionary } from '../interfaces';

export function filterObject<T>(
  object: Dictionary<T>,
  predicate: (entry: T) => boolean
): Dictionary<T> {
  return R.pipe(
    R.toPairs,
    R.reduce((acc: Dictionary<T>, [key, value]: [string, T]) => {
      if (predicate(value)) {
        acc[key] = value;
      }
      return acc;
    }, {})
  )(object);
}
