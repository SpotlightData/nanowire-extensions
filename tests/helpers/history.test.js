import { updatedQuery } from '@spotlightdata/nanowire-extensions';

describe('helpers/history', () => {
  describe('updatedQuery', () => {
    it('should allow to update a search value', () => {
      const history = { location: { search: 'value=value1' } };
      const result = updatedQuery(history, 'value', 'value2');
      expect(result.search).toEqual('value=value2');
    });
    it('should maintain old values', () => {
      const history = { location: { search: 'value=value1&test=test' } };
      const result = updatedQuery(history, 'value', 'value2');
      expect(result.search).toEqual('value=value2&test=test');
    });

    it('should allow to remove values', () => {
      const history = { location: { search: 'value=value1&test=test' } };
      const result = updatedQuery(history, 'value', 'value2', ['test']);
      expect(result.search).toEqual('value=value2');
    });

    it('should allow to modify multiple values', () => {
      const history = { location: { search: 'value=value1&test=test' } };
      const result = updatedQuery(history, [['value', 'value2'], ['test', 'test2']]);
      expect(result.search).toEqual('value=value2&test=test2');
    });
  });
});
