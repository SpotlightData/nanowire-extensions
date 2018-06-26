import {
  queryObjectToString,
  buildUrl,
  aggregationBuilder,
} from '@spotlightdata/nanowire-extensions';

describe('helpers/request', () => {
  describe('queryObjectToString', () => {
    it('should return empty string when empty object is passed', () => {
      expect(queryObjectToString({})).toBe('');
    });

    it('should format url in correct format', () => {
      expect(queryObjectToString({ test: 'value' })).toBe('test=value');
    });

    it('should be able to handle objects containing multiple key', () => {
      expect(
        queryObjectToString({
          test: 'value',
          test2: 'value2',
        })
      ).toBe('test=value&test2=value2');
    });
  });
  describe('buildUrl', () => {
    it('should not add query if empty object is passed', () => {
      expect(buildUrl(false, '', '/test', {})).toBe('/test');
    });

    it('should add query to url', () => {
      expect(buildUrl(false, '', '/test', { test: 'value' })).toBe('/test?test=value');
    });

    it('should add base url when requested', () => {
      expect(buildUrl(true, '/api', '/test', { test: 'value' })).toBe('/api/test?test=value');
    });

    it('should not break url if query is not specified', () => {
      expect(buildUrl(true, '/api', '/test')).toBe('/api/test');
    });
  });

  describe('aggregationBuilder', () => {
    it('should remove baseUrl within the uri key', () => {
      const baseUrl = '/api';
      const baseConfig = {
        headers: {
          Accept: 'application/json',
          Authorization: `JWT token`,
          'Content-Type': 'application/json',
        },
        responseType: 'json',
      };
      const settings = {
        url: baseUrl + '/tests',
        method: 'get',
        aggregation: '*',
        body: {
          data: true,
        },
      };
      expect(aggregationBuilder(baseConfig, baseUrl, settings)).toEqual({
        body: {
          aggregation: '*',
          request: {
            body: {
              data: true,
            },
            method: 'get',
            uri: '/tests',
          },
        },
        headers: {
          Accept: 'application/json',
          Authorization: 'JWT token',
          'Content-Type': 'application/json',
        },
        method: 'post',
        responseType: 'json',
        url: '/api/aggregations',
      });
    });
  });
});
