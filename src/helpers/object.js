import * as R from 'ramda';

const entries = Object.entries.bind(Object),

export const objectFilter = (object, predicate) => R.pipe(
  entries,
  R.reduce((dict, [key, value]) =>
    predicate(value) ? R.assoc(key, value, dict) : dict, {})
)(object)