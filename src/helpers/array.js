import * as R from 'ramda';

export const toDictionary = (arr, key) =>
  R.reduce((dict, entry) => R.assoc(entry[key], entry, dict), {}, arr);
