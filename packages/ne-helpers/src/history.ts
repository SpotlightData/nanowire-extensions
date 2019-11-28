import * as R from 'ramda';
import { History, Location } from 'history';
import { queryObjectToString, queryUrlToObject } from './request';
import { Dictionary } from 'ts-essentials';
import { safeStringEncode, safeStringDecode } from './string';

type Pair = [string, string];

export function getQuery(context: History): Dictionary<string> {
  return queryUrlToObject(context.location.search);
}

export function updateLocation(
  context: Location,
  updates: Pair[],
  removes: string[] = []
): Location {
  const search = R.pipe(
    R.prop('search'),
    queryUrlToObject,
    R.toPairs,
    R.concat(updates),
    R.uniqBy((p: Pair) => p[0]),
    R.filter((p: Pair) => !removes.includes(p[0])),
    p => R.fromPairs(p),
    queryObjectToString
  )(context);

  location.search = search;
  return context;
}

// Allows to create new location to be pushed using history.push
export function updateQuery(context: History, updates: Pair[], removes: string[] = []): History {
  context.location.search = updateLocation(context.location, updates, removes).search;
  return context;
}

export function queryObjectEncode(dictionary: Dictionary<any>): Dictionary<string> {
  let dict: Dictionary<string> = {};
  for (let [key, value] of Object.entries(dictionary)) {
    dict[key] = safeStringEncode(String(value));
  }
  return dict;
}

export function queryObjectDecode(dictionary: Dictionary<string>): Dictionary<string> {
  let dict: Dictionary<string | null> = {};
  for (let [key, value] of Object.entries(dictionary)) {
    dict[key] = safeStringDecode(value);
  }
  return dict;
}
