/**
 * Used to conver query object to a url parameter string
 * @example
 * import { queryObjectToString } from '@spotlightdata/nanowire-extensions';
 * queryObjectToString({ test: 'value', test2: 'value2' }); // 'test=value&test2=value2'
 * @param {Object} query Key value object containing query that will be put into the url
 */
export function queryObjectToString(query) {
  return Object.keys(query)
    .reduce((url, key) => `${url}&${key}=${query[key]}`, '')
    .slice(1); // Removing the first & symbol
}
/**
 * Used for configuring urls
 * @example
 * import { buildUrl } from '@spotlightdata/nanowire-extensions';
 * buildUrl(true, '/api', '/test', { test: 'value' }); // '/api/test?test=value'
 * @param {boolean} withBase Choose whether prefix will be added
 * @param {string} baseUrl The prefix to url
 * @param {string} url Url to be configured
 * @param {Object} query Key value object containing query that will be put into the url
 */
export function buildUrl(withBase, baseUrl, url, query) {
  const extra = queryObjectToString(query);
  const fullUrl = url + (extra.length !== 0 ? '?' + extra : '');
  return withBase ? baseUrl + fullUrl : fullUrl;
}
