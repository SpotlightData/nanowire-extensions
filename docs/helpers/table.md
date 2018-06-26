# table.js

## propSort

### About

Allows to sort objects by given key. Mainly

### Parameters

Function is curried

```jasvasript
propSort(key: string, a: number | string, b: number | string): number
```

### Example

```javascript
import { propSort } from '@spotlightdata/nanowire-extensions';
const sorter = propSort('name');
console.log(sorter({ name: 'a' }, { name: 'b' }));
```
