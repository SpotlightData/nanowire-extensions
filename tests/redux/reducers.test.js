import { flattenReducers, applyReducer } from '@spotlightdata/nanowire-extensions';

describe('redux/reducers', () => {
  describe('applyReducer', () => {
    it('should return an array containing [key, reducer]', () => {
      const reducer = {
        cases: {
          test: (state, action) => ({ ...state, ...action.payload }),
        },
        initialState: {},
        key: 'test',
      };
      const result = applyReducer(reducer);
      expect(result[0]).toBe('test');
      expect(typeof result[1]).toBe('function');
    });

    it('should return state if action type(case) is not found', () => {
      const reducer = {
        cases: { test: (state, action) => ({ ...state, ...action.payload }) },
        initialState: { test: 'test' },
        key: 'test',
      };
      const [key, reducerFn] = applyReducer(reducer);
      expect(reducerFn(undefined, { type: 'init' })).toEqual(reducer.initialState);
    });
  });

  describe('flattenReducers', () => {
    it('combine reducers to single object', () => {
      const reducer = {
        cases: { test: (state, action) => ({ ...state, ...action.payload }) },
        initialState: {},
        key: 'test',
      };
      const result = flattenReducers([applyReducer(reducer)]);
      expect(typeof result).toBe('object');
      expect(typeof result.test).toBe('function');
    });
  });
});
