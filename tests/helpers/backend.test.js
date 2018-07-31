import { configureBackEnd } from '@spotlightdata/nanowire-extensions';
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
          'Content-Type': 'application/json',
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
  });
});
