import { generateColumns, propSort } from '@spotlightdata/nanowire-extensions';

describe('helpers/table', () => {
  describe('propSort', () => {
    it('should be able to take a string as an accessor', () => {
      const sorter = propSort('test');
      expect(sorter({ test: 'a' }, { test: 'b' })).toBe(-1);
      expect(sorter({ test: 1 }, { test: 0 })).toBe(1);
    });
    it('should be able to take a function as an accessor', () => {
      const sorter = propSort(a => a.test);
      expect(sorter({ test: 'a' }, { test: 'b' })).toBe(-1);
      expect(sorter({ test: 1 }, { test: 0 })).toBe(1);
    });
  });

  describe('generateColumns', () => {
    it('it should strip expandedOnly key from columns', () => {
      const columns = generateColumns([
        { test: 'test', expandedOnly: true },
        { test: 'test2', expandedOnly: false },
      ])(false);
      expect(columns.some(col => col.expandedOnly !== undefined)).toBe(false);
    });

    it('it should filter expanded only columns if false is passed', () => {
      const columns = generateColumns([
        { test: 'test', expandedOnly: true },
        { test: 'test2', expandedOnly: false },
      ])(false);
      expect(columns.length).toBe(1);
      expect(columns).toEqual([
        {
          test: 'test2',
        },
      ]);
    });
  });
});
