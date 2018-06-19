export function queryObjectToString(query) {
  return Object.keys(query)
    .reduce((url, key) => `${url}&${key}=${query[key]}`, '')
    .slice(1); // Removing the first & symbol
}

export function buildUrl(withBase, baseUrl, url, query) {
  const params = queryObjectToString(query);
  const fullUrl = url + (params.length !== 0 ? '?' + params : '');
  return withBase ? baseUrl + fullUrl : fullUrl;
}
