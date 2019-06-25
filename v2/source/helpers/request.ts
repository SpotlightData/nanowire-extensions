import * as R from 'ramda';
import { Dictionary } from '../interfaces';
import { AxiosRequestConfig } from 'axios';

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

// TODO add better types here
export function aggregationBuilder<T>(
  baseConfig: T,
  baseUrl: string,
  { aggregation, ...request }: AxiosRequestConfig & { aggregation?: string }
) {
  const { url, ...rest } = request;
  const uri = url.includes(baseUrl) ? url.replace(baseUrl, '') : url;
  return R.mergeDeepRight(baseConfig, {
    url: `${baseUrl}/aggregations`,
    method: 'post',
    data: { request: { ...rest, uri }, aggregation },
  });
}

export function buildBaseConfig<T>(token: string, extra: T) {
  return R.mergeDeepRight(
    {
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`,
      },
      responseType: 'json',
    },
    extra
  );
}
