export function queryObjectToString(query) {
  return Object.keys(query)
    .reduce((url, key) => `${url}&${key}=${query[key]}`, '')
    .slice(1); // Removing the first & symbol
}

export function buildUrl(withBase, baseUrl, url, query = {}) {
  const extra = queryObjectToString(query);
  const fullUrl = url + (extra.length !== 0 ? '?' + extra : '');
  return withBase ? baseUrl + fullUrl : fullUrl;
}

export function aggregationBuilder(baseConfig, baseUrl, { aggregation, ...request }) {
  const { url, ...rest } = request;
  const uri = url.includes(baseUrl) ? url.replace(baseUrl, '') : url;
  return {
    ...baseConfig,
    url: `${baseUrl}/aggregations`,
    method: 'post',
    body: { request: { ...rest, uri }, aggregation },
  };
}
