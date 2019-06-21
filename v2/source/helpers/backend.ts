import { tap } from 'rxjs/operators';
import * as R from 'ramda';

import { AjaxObservable, AjaxData } from './ajax';
import { aggregationBuilder, buildUrl, buildBaseConfig } from './request';
import { BackEndOptions } from '../interfaces';

export function configureBackEnd(
  onRequest: (data: AjaxData) => void,
  request = AjaxObservable.create
) {
  const listener = typeof onRequest === 'function' ? onRequest : R.identity;

  return (token: string, baseUrl: string, extraConfig = {}) => {
    const baseConfig = buildBaseConfig(token, extraConfig);

    return ({ hasBase, data, body, ...settings }: BackEndOptions) => {
      const base = hasBase === false ? '' : baseUrl;
      const url = buildUrl(settings.url, base, settings.query);
      const fullSettings = { ...settings, url, data: data || body };
      const config =
        settings.aggregation !== undefined
          ? aggregationBuilder(baseConfig, baseUrl, fullSettings)
          : R.mergeDeepRight(baseConfig, fullSettings);
      return request(config).pipe(tap(listener));
    };
  };
}
