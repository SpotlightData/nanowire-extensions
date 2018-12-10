# history.js

## getQuery

### About

Returns object containing search params from supplied history

### Parameters

```jasvasript
getQuery(string): object
```

### Example

```javascript
import { getQuery } from '@spotlightdata/nanowire-extensions';
const data = getQuery({ location: { search: '?a=b'}});
// data.a === 'b'
```

## updatedQuery

### About

Updates history by updating select key and removing required ones.

### Parameters

```jasvasript
updatedQuery(history: Object<T>, name: string, value: string, remove: ?Array<String>): Object<T>
```

### Example

```javascript
import { updatedQuery } from '@spotlightdata/nanowire-extensions';

const newHistory = updatedQuery(window.history, 'a', '2');
// newHistory.location.search = ?a=2
```
