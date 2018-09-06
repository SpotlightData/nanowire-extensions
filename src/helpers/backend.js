import { of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { mergeDeepRight } from 'ramda';

import { AjaxObservable } from '../internal/ajax';
import { aggregationBuilder, buildUrl, buildBaseConfig } from './request';

const isFunction = fn => typeof fn === 'function';

export function configureBackEnd(onRequest, request = AjaxObservable.create) {
  const modifiers = [
    isFunction(onRequest) ? tap(onRequest) : undefined,
  ].filter(p => p); // Remove the undefined entries

  return (token, baseUrl, extraConfig = {}) => {
    const baseConfig = buildBaseConfig(token, extraConfig);

    return ({ hasBase = true, data, body, ...settings }) => {
      const url = buildUrl(hasBase, baseUrl, settings.url, settings.query);
      const fullSettings = { ...settings, url, data: data || body };
      const config = settings.aggregation
        ? aggregationBuilder(baseConfig, baseUrl, fullSettings)
        : mergeDeepRight(baseConfig, fullSettings);
      return request(config).pipe(...modifiers);
    };
  };
}
