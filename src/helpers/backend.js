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

const noop = a => a;

export function configureBackEnd(onRequest = noop, request = ajax) {
  return (token, baseUrl, extraConfig = {}) => {
    const baseConfig = buildBaseConfig(token, extraConfig);

    return ({ hasBase = true, data, body, ...settings }) => {
      const url = buildUrl(hasBase, baseUrl, settings.query || {}, settings.url);
      const fullSettings = { ...settings, url, body: data || body };

      const config = settings.aggregation
        ? aggregationBuilder(baseConfig, baseUrl, fullSettings)
        : Object.assign(baseConfig, fullSettings);
      return request(config).pipe(
        map(req => [null, req.response]),
        catchError(err => of([err, null])),
        tap(onRequest)
      );
    };
  };
}
