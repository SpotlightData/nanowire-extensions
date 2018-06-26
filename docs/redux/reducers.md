# reducers.js

## flattenReducers

### About

Pass reducers made with `applyReducer` function. This will flatten them,so they can be passed to `combineReducers` function

### Parameters

- {[string, Function][]} [reducers]

```jasvasript
flattenReducers(reducers)
```

### Example

```javascript
import { flattenReducers } from '@spotlightdata/nanowire-extensions';

const reducers = flattenReducers(['user', (state, action) => ({ ...state, ...action.payload })]);
// { user: (state, action) => ({...state, ...action.payload}) }
```

## applyReducer

### About

Will create a configuration for reducer and return

### Parameters

- {Object} [reducer] - should contain: {key, cases, initalState}

```jasvasript
applyReducer(reducer): [key, reducerFn]
```

```javascript
import { applyReducer } from '@spotlightdata/nanowire-extensions';

const reducer = applyReducer({ key: 'test', cases: {}, initialState: {} });
```
