import { createMarkedTextRows } from '../src';

describe('text-search', () => {
  describe('createMarkedTextRows', () => {
    it('should maintain passed meta data', () => {
      const meta = { test: 'hello' };
      const output = createMarkedTextRows(
        [{ search: 'test', color: 'red', meta }],
        [{ id: 'content', entries: [{ source: 'main', text: 'test' }] }]
      );
      const saved = output[0].occurrences[0];
      expect(saved.meta.meta).toEqual(meta);
    });
  });
});
