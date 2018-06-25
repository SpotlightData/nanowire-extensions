# request.js

## queryObjectToString

### About

Used to conver query object to a url parameter string

### Parameters

```jasvasript
queryObjectToString(query: object): string
```

### Example

```javascript
import { queryObjectToString } from '@spotlightdata/nanowire-extensions';
queryObjectToString({ test: 'value', test2: 'value2' }); // 'test=value&test2=value2'
```

## buildUrl

### About

Used for configuring urls

### Parameters

```jasvasript
buildUrl(withBase: boolean, baseUrl: string, url: string, query: object): string
```

### Example

```javascript
import { buildUrl } from '@spotlightdata/nanowire-extensions';

buildUrl(true, '/api', '/test', { test: 'value' }); // '/api/test?test=value'
```
