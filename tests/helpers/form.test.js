import { validateSchema } from '@spotlightdata/nanowire-extensions';

describe('helpers/form', () => {
  describe('validateSchema', () => {
    it('should return undefined if no errors occur', () => {
      const resp = validateSchema({ validateSync: () => false }, {});
      expect(resp).toBe(undefined);
    });

    it('should format thrown error', () => {
      const resp = validateSchema(
        {
          validateSync: () => {
            throw { path: 'test', message: 'test-message' };
          },
        },
        {}
      );
      expect(resp).toEqual(
        expect.objectContaining({
          test: 'test-message',
        })
      );
    });
  });
});
