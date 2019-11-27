import * as R from 'ramda';
import { History } from 'history';
import { queryObjectToString, queryUrlToObject } from './request';
import { Dictionary } from 'ts-essentials';
import { safeStringEncode, safeStringDecode } from './string';

type Pair = [string, string];

export function getQuery(context: History): Dictionary<string> {
  return queryUrlToObject(context.location.search);
}

// Allows to create new location to be pushed using history.push
export function updateQuery(context: History, updates: Pair[], removes: string[] = []): History {
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
