import { mergeDeepRight } from 'ramda';

export function queryObjectToString(query) {
  return Object.keys(query)
    .reduce((url, key) => `${url}&${encodeURI(key)}=${encodeURI(query[key])}`, '')
    .slice(1); // Removing the first & symbol
}

export function queryUrlToObject(search) {
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

export function buildUrl(withBase, baseUrl, url, query = {}) {
  const extra = queryObjectToString(query);
  const fullUrl = url + (extra.length !== 0 ? '?' + extra : '');
  return withBase ? baseUrl + fullUrl : fullUrl;
}

export function aggregationBuilder(baseConfig, baseUrl, { aggregation, ...request }) {
  const { url, ...rest } = request;
  const uri = url.includes(baseUrl) ? url.replace(baseUrl, '') : url;
  return mergeDeepRight(baseConfig, {
    url: `${baseUrl}/aggregations`,
    method: 'post',
    data: { request: { ...rest, uri }, aggregation },
  });
}

export const buildBaseConfig = (token, extra) =>
  mergeDeepRight(
    {
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`,
      },
      responseType: 'json',
    },
    extra
  );
