# hoc.js

## strictComponent

### About

A higher order function to allow for strict checks before render
Example usage is:

- Checking if user has been authenticated
- Checking if user is an admin

### Parameters

```jasvasript
strictComponent(predicate: props => bool, onFail: props => bool): ReactComponent => ReactComponent
```

### Example

```javascript
import { strictComponent } from '@spotlightdata/nanowire-extensions';

const MyComponent = strictComponent(props => props.isAdmin, props => console.log('Failed'))(
  BaseComponent
);
```
