import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { aggregationBuilder, buildUrl } from './request';

const buildBaseConfig = (token, extra) =>
  Object.assign(
    {
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    },
    extra
  );

const isFunction = fn => typeof fn === 'function';

export function configureBackEnd(onRequest, request = ajax) {
  const modifiers = [
    map(req => [null, req.response]),
    catchError(err => of([err, null])),
    isFunction(onRequest) ? tap(onRequest) : undefined,
  ].filter(p => p); // Remove the undefined entries

  return (token, baseUrl, extraConfig = {}) => {
    const baseConfig = buildBaseConfig(token, extraConfig);

    return ({ hasBase = true, data, body, ...settings }) => {
      const url = buildUrl(hasBase, baseUrl, settings.url, settings.query);
      const fullSettings = { ...settings, url, body: data || body };
      const config = settings.aggregation
        ? aggregationBuilder(baseConfig, baseUrl, fullSettings)
        : Object.assign(baseConfig, fullSettings);
      return request(config).pipe(...modifiers);
    };
  };
}
