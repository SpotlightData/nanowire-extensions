# withMappedActions.js

## mapActionsToBackEnd

### About

Used to inject request and dispatch functions inside actions in format of `(requestFn, dispatchFn)`

### Parameters

- {Object} [actions] - actions that will be passed fetch and dispatch functions
- {Object} [props] - props taken from redux connect
- {Function} [backEndConf] Function to configure back-end which will be passed to actions

```jasvasript
mapActionsToBackEnd(actions, props, backEndConf)
```

### Example

```javascript
import { mapActionsToBackEnd } from '@spotlightdata/nanowire-extensions';

const actions = { fakeAction: (backend, dispatch) => data => console.log(data) };
const props = { dispatch: () => console.log('fake dispatch'), token: 'fake-token' };
const backendConf = token => request => console.log('request made');

const actions = mapActionsToBackEnd(actions, props, backendConf);
```

## withMappedActions

### About

Used to inject and configure actions inside of react components

### Parameters

- {Function} [mapFn] - Function that will be applied to get actions
- {Object} [actions] - all of the actions that the <code>mapFn</code> will be applied to
- {Function} backEndConf - Function that the token will be passed to.
- {Function} createElement - Function that will create the element. Should pass React.createElement
- {ReactElement} [Comp] - Component to wrap

```jasvasript
withMappedActions(mapFn, actions, backEndConf, createElement) => (Component => ReactComponent)
```

### Example

```javascript
import {
  withMappedActions,
  mapActionsToBackEnd,
  configureBackEnd,
  apply,
} from '@spotlightdata/nanowire-extensions';

import { createElement } from 'react';
import { connect } from 'react-redux';
import { path } from 'ramda';

import { apply } from 'helpers/apply';
import { store } from './store';

const checkForInvalidToken = store => data => {
  const type = path(['0', 'response', 'type'], data);
  if (type === 'INVALID_TOKEN') {
    console.log('Should logout');
    window.location.reload();
  }
};

export function withBackEndActions(actions) {
  return withMappedActions(
    mapActionsToBackEnd,
    actions,
    configureBackEnd(checkForInvalidToken(store)),
    createElement
  );
}

const defaultStateToProps = state => ({
  token: state.user.token,
  isAdmin: state.user.isAdmin,
  myId: state.user._id,
});
const defaultDispatchToProps = dispatch => ({ dispatch });

export function withActions(
  actions,
  stateToProps = defaultStateToProps,
  dispatchToProps = defaultDispatchToProps
) {
  return apply(
    withBackEndActions(actions),
    connect(
      stateToProps,
      dispatchToProps
    )
  );
}
```
