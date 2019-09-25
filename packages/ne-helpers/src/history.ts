import * as R from 'ramda';
import { History } from 'history';
import { queryObjectToString, queryUrlToObject } from './request';
import { filterObject } from './object';
import { Dictionary } from 'ts-essentials';

type Pair = [string, string];

export function getQuery(context: History): Dictionary<string> {
  return queryUrlToObject(context.location.search);
}

// Allows to create new location to be pushed using history.push
export function updateQuery(context: History, updates: Pair[], removes: string[]): History {
  const search = R.pipe(
    getQuery,
    R.toPairs,
    R.concat(updates),
    R.uniqBy((p: Pair) => p[0]),
    R.filter((p: Pair) => !removes.includes(p[0])),
    p => R.fromPairs(p),
    queryObjectToString
  )(context);

  context.location.search = search;
  return context;
}
