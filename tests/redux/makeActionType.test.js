import { makeActionType } from '@spotlightdata/nanowire-extensions';

describe('redux/makeActionType', () => {
  describe('makeActionType', () => {
    it('should return object', () => {
      expect(makeActionType('', [])).toBeInstanceOf(Object);
    });

    it('should add prefix to object values', () => {
      const types = makeActionType('PREFIX', ['KEY']);
      expect(types.KEY).toBe('PREFIX_KEY');
    });

    it('should combine types with defaultTypes', () => {
      const types = makeActionType('PREFIX', ['KEY'], ['DEF_KEY']);
      expect(types.KEY).toBe('PREFIX_KEY');
      expect(types.DEF_KEY).toBe('PREFIX_DEF_KEY');
    });
  });
});
