import { timeSort } from '@spotlightdata/nanowire-extensions';

describe('helpers/time', () => {
  describe('timeSort', () => {
    const date1 = { x: Date.now() };
    const date2 = { x: Date.now() - 2000 };
    const date3 = { x: date1.x };
    it('should allow sort by key', () => {
      expect(timeSort('x')(date1, date2)).toBe(1);
    });

    it('should allow sort by accessor function', () => {
      expect(timeSort(a => a.x)(date2, date1)).toBe(-1);
    });

    it('should return 0 if values are equal', () => {
      expect(timeSort(a => a.x)(date1, date3)).toBe(0);
    });
  });
});
