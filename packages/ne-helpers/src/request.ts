import * as R from 'ramda';
import { Dictionary } from 'ts-essentials';

export function queryObjectToString(query: Dictionary<string>) {
  return Object.keys(query)
    .reduce((url, key) => `${url}&${encodeURI(key)}=${encodeURI(query[key])}`, '')
    .slice(1); // Removing the first & symbol
}

export function queryUrlToObject(search: string): Dictionary<string> {
  const string = search.indexOf('?') === 0 ? search.slice(1) : search;
  if (string.length === 0) {
    return {};
  }

  return string.split('&').reduce((dict, pair) => {
    const eqIndex = pair.indexOf('=');
    const key = pair.slice(0, eqIndex);
    const value = pair.slice(eqIndex + 1, pair.length);
    return { ...dict, [decodeURI(key)]: decodeURI(value) };
  }, {});
}

export function buildUrl(url: string, baseUrl: string, query: Dictionary<string> = {}) {
  const extra = queryObjectToString(query);
  const fullUrl = url + (extra.length !== 0 ? '?' + extra : '');
  return baseUrl + fullUrl;
}
