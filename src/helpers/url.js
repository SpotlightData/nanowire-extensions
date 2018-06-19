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
 * @param {Boolean} withBase Choose whether prefix will be added
 * @param {String} baseUrl The prefix to url
 * @param {String} url Url to be configured
 * @param {Object} query Key value object containing query that will be put into the url
 */
export function buildUrl(withBase, baseUrl, url, query) {
  const extra = queryObjectToString(query);
  const fullUrl = url + (extra.length !== 0 ? '?' + extra : '');
  return withBase ? baseUrl + fullUrl : fullUrl;
}
