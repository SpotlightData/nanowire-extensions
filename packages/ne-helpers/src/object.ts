import * as R from 'ramda';
import { Dictionary } from 'ts-essentials';

export function filterObject<T>(
  object: Dictionary<T>,
  predicate: (key: string, entry: T) => boolean
): Dictionary<T> {
  const output = {};
  for (let [key, value] of Object.entries(object)) {
    if (predicate(key, value)) {
      output[key] = value;
    }
  }
  return output;
}
