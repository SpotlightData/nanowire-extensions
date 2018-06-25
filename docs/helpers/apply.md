# apply.js

## apply

### About

Allows to pipe a variable trough a list of functions.
Mainly used for applying HOC to react components

### Parameters

```jasvasript
apply(...fns: [a => b])
```

### Example

```javascript
import { apply } from '@spotlightdata/nanowire-extensions';

const Component = apply(injectSheet(style), withRouter)(ComponentCore);
```
