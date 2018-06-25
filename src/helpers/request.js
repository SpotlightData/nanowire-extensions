export function queryObjectToString(query) {
  return Object.keys(query)
    .reduce((url, key) => `${url}&${key}=${query[key]}`, '')
    .slice(1); // Removing the first & symbol
}

export function buildUrl(withBase, baseUrl, url, query) {
  const extra = queryObjectToString(query);
  const fullUrl = url + (extra.length !== 0 ? '?' + extra : '');
  return withBase ? baseUrl + fullUrl : fullUrl;
}
