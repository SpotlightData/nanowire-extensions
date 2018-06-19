import { queryObjectToString, buildUrl } from '@spotlightdata/nanowire-extensions';

describe('helpers/url', () => {
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
  });
});
