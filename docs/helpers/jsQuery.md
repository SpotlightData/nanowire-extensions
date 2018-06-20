# jsQuery.js

## buildJsQuery

### About

Makes easier to write jmespath specifications by allowing to use objects as well as arrays

### Parameters

```jasvasript
buildJsQuery(string|object|[string|object]): string
```

### Example

```javascript
import { buildJsQuery } from '@spotlightdata/nanowire-extensions';
const sizeJsQuery = buildJsQuery({
  vars: {
    SLD: '_source.jsonLD',
  },
  query: [
    'hits.hits[*]',
    '.',
    {
      taskId: '_id',
      fileSize: 'SLD.fileSize',
      fileType: 'SLD.fileFormat || SLD."@type"',
      name: 'SLD.name',
    },
  ],
});
```

## runJsQuery

### About

Helps to handle any failures that can occur when a jmespath spec is run
http://jmespath.org/

### Parameters

```jasvasript
// query is a string that is ran using jmespath
runJsQuery(data: [any]|object, query: string, or: any): any
```

### Example

```javascript
import { runJsQuery } from '@spotlightdata/nanowire-extensions';

runJsQuery({ x: { y: 'a' } }, 'x.y'); // 'a'
runJsQuery({ x: { y: 'a' } }, 'x.y'); // 'a'
runJsQuery({ x: {} }, 'x.y', 'b'); // 'b'
```
