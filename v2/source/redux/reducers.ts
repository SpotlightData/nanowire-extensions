import * as R from 'ramda';
import { Dictionary } from '../interfaces';
import { AnyAction, ReducersMapObject, Action } from 'redux';

// Usefull when we pass initial value
export type SafeReducer<S = any, A extends Action = AnyAction> = (state: S, action: A) => S;
// Should always pass initial state
export interface ReducerCases<S> extends Dictionary<SafeReducer<S, AnyAction>> {}

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
      const [key, handler]: [string, SafeReducer] = entry;
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
): SafeReducer<S, A> {
  return (state: S | undefined, action: A): S | undefined => {
    let safeState = (state || initialState) as S;
    // Not falsy
    if (safeState) {
      // Do a shallow copy, so we can modify fields
      safeState = Object.assign({}, safeState);
    }

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
): [string, SafeReducer<S, A>] {
  return [reducer.key, createReducer<S, A>(reducer.cases, reducer.initialState)];
}