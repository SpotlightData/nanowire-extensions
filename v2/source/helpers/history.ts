import * as R from 'ramda';
import { queryUrlToObject, queryObjectToString } from './request';
import { filterObject } from './object';

export interface RouterContext {
  location: {
    search: string;
  };
}

type SPairs = [string, string][];

export function getQuery(context: RouterContext) {
  return R.pipe(
    R.pathOr('', ['location', 'search']),
    queryUrlToObject
  )(context);
}

function updateQuery(context: RouterContext, updates: SPairs, removes: string[]) {
  const updated = R.reduce(
    (acc, entry) => {
      acc[entry[0]] = entry[1];
      return acc;
    },
    getQuery(context),
    updates
  );
  const filtered = filterObject(updated, (key, _value) => !removes.includes(key));
  context.location.search = queryObjectToString(filtered);
}

/**
 * Allows to create new location to be pushed using history.push
 * Can take either:
 *  history, name, value, string list - where modifies a single property
 *  history, string list, string list - modifies all entries in first list
 */
export function updatedQuery(
  context: RouterContext,
  name: string | SPairs,
  value: string | string[],
  remove?: string[]
) {
  if (Array.isArray(name)) {
    updateQuery(context, name, (value as string[]) || []);
  } else {
    updateQuery(context, [[name, value as string]], remove || []);
  }
}
