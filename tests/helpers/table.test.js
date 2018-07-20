import { generateColumns } from '@spotlightdata/nanowire-extensions';

describe('helpers/table', () => {
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
