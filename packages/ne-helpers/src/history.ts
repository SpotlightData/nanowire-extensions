import * as R from 'ramda';
import { History, Location } from 'history';
import { queryObjectToString, queryUrlToObject } from './request';
import { Dictionary } from 'ts-essentials';
import { safeStringEncode, safeStringDecode } from './string';

type Pair = [string, string];

export function getQuery(context: History): Dictionary<string> {
  return queryUrlToObject(context.location.search);
}

export function updateSearch(search: string, updates: Pair[], removes: string[] = []): string {
  return R.pipe(
    queryUrlToObject,
    R.toPairs,
    R.concat(updates),
    R.uniqBy(R.nth(0)),
    R.filter((p: Pair) => !removes.includes(p[0])),
    p => R.fromPairs(p),
    queryObjectToString
  )(search);
}

// Allows to create new location to be pushed using history.push
export function updateQuery(context: History, updates: Pair[], removes: string[] = []): History {
  context.location.search = updateSearch(context.location.search, updates, removes);
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
