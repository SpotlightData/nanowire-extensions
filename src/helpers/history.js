import { queryUrlToObject, queryObjectToString } from './request';
import * as R from 'ramda';

export const getQuery = R.pipe(
  R.pathOr('', ['history', 'location', 'search']),
  queryUrlToObject
);

function updateQuery(history, updates, removes) {
  const updated = R.reduce(
    (prevH, entry) => R.assoc(entry[0], entry[1], prevH),
    getQuery({ history }),
    updates
  );
  const filtered = R.reduce((dict, name) => R.dissoc(name, dict), updated, removes);
  return R.assoc('search', queryObjectToString(filtered), history.location);
}

/**
 * Allows to create new location to be pushed using history.push
 * Can take either:
 *  history, name, value, string list - where modifies a single property
 *  history, string list, string list - modifies all entries in first list
 */
export function updatedQuery(history, name, value, remove) {
  if (Array.isArray(name)) {
    return updateQuery(history, name, value || []);
  } else {
    return updateQuery(history, [[name, value]], remove || []);
  }
}
