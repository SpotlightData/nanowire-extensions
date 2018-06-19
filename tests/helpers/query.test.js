import { buildJsQuery } from 'nanowire-extensions';

describe('helpers/query', () => {
  describe('buildQuery', () => {
    it('should accept an array', () => {
      const list = ['hits.', 'hits'];
      const query = buildJsQuery(list);
      expect(query).toEqual(list.join(''));
    });
  });
});
