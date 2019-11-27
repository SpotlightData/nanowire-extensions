import { createMarkedTextRows, DEFAULT_HIGHLIGHT_MARKER_SYMBOL, highlightToMarked } from '../src';

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

  describe('highlightToMarked', () => {
    it('should work with multiple terms', () => {
      const text = [
        DEFAULT_HIGHLIGHT_MARKER_SYMBOL + 'hello' + DEFAULT_HIGHLIGHT_MARKER_SYMBOL,
        ' sir are you doing ',
        DEFAULT_HIGHLIGHT_MARKER_SYMBOL,
        'jquery',
        DEFAULT_HIGHLIGHT_MARKER_SYMBOL,
      ].join('');
      const terms = ['hello', 'jquery'];
      const marked = highlightToMarked(terms, text);
      expect(marked).toEqual([
        { type: 'marked', text: 'hello', start: 0, end: 8 },
        { type: 'regular', text: ' sir are you doing ', start: 11, end: 30 },
        { type: 'marked', text: 'jquery', start: 33, end: 39 },
        { type: 'regular', text: '', start: 39, end: 39 },
      ]);
    });
  });
});
