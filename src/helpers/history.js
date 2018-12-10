import { queryUrlToObject, queryObjectToString } from './request';
import * as R from 'ramda';

export const getQuery = R.pipe(
  R.pathOr('', ['history', 'location', 'search']),
  queryUrlToObject
);

export function updatedQuery(history, name, value, remove = []) {
  const updated = R.assoc(name, value, getQuery(history));
  const filtered = R.reduce((dict, name) => R.dissoc(name, dict), updated, remove);
  return { ...history.location, search: queryObjectToString(filtered) };
}
