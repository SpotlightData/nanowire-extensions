import { apply } from '@spotlightdata/nanowire-extensions';

describe('helpers/apply', () => {
  describe('apply', () => {
    it('should not break when no functions are passed', () => {
      expect(apply()(true)).toBe(true);
    });

    it('should handle multiple functions', () => {
      const add = n => n + 1;
      expect(apply(add, add, add)(1)).toBe(4);
    });
  });
});
