import { searchTextIn } from '../src';

describe('string', () => {
  describe('searchTextIn', () => {
    it('should allow to perform partial search', () => {
      const index = searchTextIn('I am testing', 'ing', false, true);
      expect(index).toBe(9);
    });
  });
});
