import { searchTextIn } from '../src';

describe('string', () => {
  describe('searchTextIn', () => {
    it('should allow to perform partial search', () => {
      const index = searchTextIn('I am testing', 'ing', false, true);
      expect(index).toBe(9);
    });

    it('should perfrom impartial search correctly', () => {
      expect(searchTextIn('I am testing', 'ing', false, false)).toBe(-1);
      expect(searchTextIn('I am testing', 'test', false, false)).toBe(-1);
      expect(searchTextIn('I am testing', 'testing', false, false)).toBe(5);
      expect(searchTextIn('I am testing', 'I', false, false)).toBe(0);
    });
  });
});
