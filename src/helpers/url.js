export function queryToString(query) {
  return Object.keys(query)
    .reduce((url, key) => `${url}&${key}=${query[key]}`)
    .slice(1); // Removing the first & symbol
}

export function buildUrl(hasBase, baseUrl, query, url) {
  const params = queryToString(query);
  const fullUrl = url + (params.length !== 0 ? `?${params}` : '');
  return hasBase ? baseUrl + fullUrl : fullUrl;
}
