import * as R from 'ramda';
import { Dictionary } from '../interfaces';
import { Reducer, Action, AnyAction, ReducersMapObject } from 'redux';

export interface ReducerCases<S> extends Dictionary<Reducer<S, AnyAction>> {}

export interface ReducerSpec<S> {
  initialState?: S;
  key: string;
  cases: ReducerCases<S>;
}

/**
 * Pass reducers made with `applyReducer` function.
 * This will flatten them,so they can be passed to `combineReducers` function
 * @param {[string, Function][]} reducers
 */
export function flattenReducers<S, A extends AnyAction>(
  reducers: [string, any]
): ReducersMapObject<S, A> {
  return R.reduce(
    (dict, entry) => {
      const [key, handler] = entry;
      // Normally we'd use Object.assign, but here we don't care about overrides
      dict[key] = handler;
      return dict;
    },
    {} as ReducersMapObject<S, A>,
    reducers
  );
}

/**
 * @param  {Object} cases - contains handler functions for actions
 * @param  {Object} [initialState={}]
 * @return {(state: Object, action: Object): Object} basic reducer
 */
function createReducer<S, A extends AnyAction>(
  cases: ReducerCases<S>,
  initialState: S
): Reducer<S, A> {
  return (state: S | undefined, action: A): S => {
    let safeState = state || initialState;
    if (cases[action.type] === undefined) {
      return safeState;
    }
    return cases[action.type](safeState, action);
  };
}

/**
 * Will create a configuration for reducer
 * @param  {Object} [reducer] - should contain: (key, cases, initalState)
 * @return {[key, reducer]} - reducer config that should be flatten with `flattenReducers`
 */
export function applyReducer<S, A extends AnyAction>(
  reducer: ReducerSpec<S>
): [string, Reducer<S, A>] {
  return [reducer.key, createReducer<S, A>(reducer.cases, reducer.initialState)];
}
