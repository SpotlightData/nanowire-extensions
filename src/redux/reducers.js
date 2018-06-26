import { reduce } from 'ramda';

/**
 * Pass reducers made with `applyReducer` function.
 * This will flatten them,so they can be passed to `combineReducers` function
 * @param {[string, Function][]} reducers
 */
export function flattenReducers(reducers) {
  return reduce(
    (dict, entry) => {
      const [key, handler] = entry;
      // Normally we'd use Object.assign, but here we don't care about overrides
      dict[key] = handler;
      return dict;
    },
    {},
    reducers
  );
}

/**
 * @param  {Object} cases - contains handler functions for actions
 * @param  {Object} [initialState={}]
 * @return {(state: Object, action: Object): Object} basic reducer
 */
function createReducer(cases, initialState = {}) {
  return (state = initialState, action) => {
    if (cases[action.type] === undefined) {
      return state;
    }
    const newState = cases[action.type](state, action);
    return Object.assign({}, state, newState);
  };
}
/**
 * Will create a configuration for reducer
 * @param  {Object} [reducer] - should contain: (key, cases, initalState)
 * @return {[key, reducer]} - reducer config that should be flatten with `flattenReducers`
 */
export function applyReducer(reducer) {
  return [reducer.key, createReducer(reducer.cases, reducer.initialState)];
}
