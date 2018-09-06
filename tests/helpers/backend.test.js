import { configureBackEnd, buildBaseConfig } from '@spotlightdata/nanowire-extensions';
import { throwError } from 'rxjs';

describe('helpers/backend', () => {
  describe('configureBackEnd', () => {
    it('should pipe onRequest function if it is specified', () => {
      const mockAjax = a => {
        return {
          pipe: (...fns) => {
            return fns;
          },
        };
      };
      const request = configureBackEnd(a => a, mockAjax)('token', '/api');
      const functions = request({
        method: 'get',
        url: '/test',
      });
      expect(functions.length).toBe(3);
    });

    it('should pass configured request to ajax function', () => {
      let result;
      const mockAjax = a => {
        result = a;
        return {
          pipe: (...fns) => {
            return fns;
          },
        };
      };
      const request = configureBackEnd(a => a, mockAjax)('token', '/api');
      request({
        method: 'get',
        url: '/test',
      });
      expect(result).toEqual({
        body: undefined,
        headers: {
          Accept: 'application/json',
          Authorization: 'JWT token',
        },
        method: 'get',
        responseType: 'json',
        url: '/api/test',
      });
    });

    it('should format if request fails', () => {
      expect.assertions(2);
      const message = 'This is an error!';
      const request = configureBackEnd(a => a, () => throwError(message))('token', '/api');
      request({ method: 'get', url: '/test' }).subscribe(([err, resp]) => {
        expect(resp).toBe(null);
        expect(err).toBe(message);
      });
    });

    it('should allow to override headers without removing token', () => {
      let result;
      const mockAjax = a => {
        result = a;
        return {
          pipe: (...fns) => {
            return fns;
          },
        };
      };
      const request = configureBackEnd(a => a, mockAjax)('token', '/api');
      request({
        method: 'get',
        url: '/test',
        headers: {
          'Content-Type': 'test',
          Accept: 'test',
        },
      });
      expect(result).toEqual({
        body: undefined,
        headers: {
          Accept: 'test',
          Authorization: 'JWT token',
          'Content-Type': 'test',
        },
        method: 'get',
        responseType: 'json',
        url: '/api/test',
      });
    });

    describe('Offer backwards compitability for axios settings', () => {
      const mockAjax = a => {
        return {
          pipe: () => {
            return a;
          },
        };
      };
      const request = configureBackEnd(a => a, mockAjax)('token', '/api');
      it('should map (body, data) -> data', () => {
        const configured = buildBaseConfig('token', {
          url: '/api/test',
          data: { test: 'test' },
        });
        expect(
          request({
            body: {
              test: 'test',
            },
            url: '/test',
          })
        ).toEqual(configured);
        expect(
          request({
            data: {
              test: 'test',
            },
            url: '/test',
          })
        ).toEqual(configured);
      });
    });
  });
});
