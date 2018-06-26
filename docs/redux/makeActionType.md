# makeActionType.js

## makeActionType

### About

Used to create redux actions. Generates object containing prefixed keys

### Parameters

- {string} prefix - Prefix to the message
- {string[]} types - Types to be added to the type object
- {string[]} [defaultTypes] - Types to be concatinated with passed types

```jasvasript
makeActionType(prefix, types, defaultTypes = [])
```

### Example

```javascript
import { makeActionType } from '@spotlightdata/nanowire-extensions';

const USER = makeType('USER', ['ADD', 'REMOVE', 'UPDATE']);
// { UPDATE: 'USER_UPDATE', REMOVE: 'USER_REMOVE', ADD: 'USER_ADD' }
```
