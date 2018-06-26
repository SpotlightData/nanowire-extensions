import { buildJsQuery, runJsQuery } from '@spotlightdata/nanowire-extensions';

describe('helpers/query', () => {
  describe('buildQuery', () => {
    it('should accept an array', () => {
      const list = ['hits.', 'hits'];
      const query = buildJsQuery(list);
      expect(query).toEqual(list.join(''));
    });

    it('should throw for empty array', () => {
      expect(() => {
        buildJsQuery([]);
      }).toThrow();
    });

    it('should accept a string', () => {
      const txt = 'test';
      const query = buildJsQuery(txt);
      expect(query).toEqual(txt);
    });

    it('should throw for empty string', () => {
      expect(() => {
        buildJsQuery('');
      }).toThrow();
    });

    it('should be able to build from objects', () => {
      const conf = {
        vars: {
          SLD: 'test',
        },
        query: 'SLD',
      };
      expect(buildJsQuery(conf)).toEqual('test');
    });

    it('should be able to combine variables when build from objects', () => {
      const conf = {
        vars: {
          SLD: 'test',
          SMD: 'test2',
        },
        query: ['SLD', '.SMD'],
      };
      expect(buildJsQuery(conf)).toEqual('test.test2');
    });
  });

  describe('runJsQuery', () => {
    it('should run jmespath query', () => {
      const ob = { x: { y: 'test' } };
      const query = 'x.y';
      expect(runJsQuery(ob, query)).toBe('test');
    });

    it('should throw for incorrect jmespath query when no default is given', () => {
      expect(() => {
        const ob = { x: { y: 'test' } };
        const query = 'x.y.';
        expect(runJsQuery(ob, query)).toBe('test');
      }).toThrow();
    });

    it('should not throw for incorrect jmespath query when default is given', () => {
      const ob = { x: { y: 'test' } };
      const query = 'x.y.';
      expect(runJsQuery(ob, query, false)).toBe(false);
    });

    it('should return default value when query does not find result', () => {
      const ob = { x: { y: 'test' } };
      const query = 'x.y.z';
      expect(runJsQuery(ob, query, true)).toBe(true);
    });
  });
});
