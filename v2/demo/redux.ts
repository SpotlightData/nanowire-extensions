import * as R from 'ramda';
import { combineReducers, AnyAction, createStore } from 'redux';
import { flattenReducers, applyReducer, ReducerSpec } from '../source';

const combine = R.pipe(
  R.map(applyReducer),
  flattenReducers,
  combineReducers
);

export interface R1State {
  total: number;
  progress: number;
  failed: number;
}

export const CASES = {
  INCREASE: 'INCREASE',
  RESET: 'RESET',
  SET: 'SET',
};

const initialState = { total: 0, progress: 0, failed: 0 };

const spec: ReducerSpec<R1State> = {
  key: 'r1state',
  initialState: R.clone(initialState),
  cases: {
    [CASES.SET]: (state: R1State, action: AnyAction): R1State => {
      state.total = action.total;
      state.failed = action.failed;
      state.progress = action.progress;
      return state;
    },
    [CASES.INCREASE]: (state: R1State, action: AnyAction): R1State => {
      const progress = state.progress + action.progress;
      if (progress + state.failed > state.total) {
        return state;
      }
      state.progress = progress;
      return state;
    },
    [CASES.RESET]: (state: R1State, action: AnyAction): R1State => {
      return R.clone(initialState);
    },
  },
};

const reducers = combine([spec]);
export const store = createStore(reducers);
