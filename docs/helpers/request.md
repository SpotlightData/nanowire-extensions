# request.js

## queryObjectToString

### About

Used to convert query object to a url parameter string

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

## aggregationBuilder

### About

Converts a regular request to a one that can be used together with jmespath endpoint to reduce request size

### Parameters

- baseConfig - The configuration that will be given to the main request body
- baseUrl - That will be put before `/aggregations` path as well as removed from the url passed in settings
- settings - Object containing the body of request that will be proxied and later aggregated

```jasvasript
aggregationBuilder(baseConfig: Object, baseUrl: string, settings: Object)
```

### Example

```javascript
import { aggregationBuilder } from '@spotlightdata/nanowire-extensions';

const baseUrl = '/api';
const baseConfig = {
  headers: {
    Accept: 'application/json',
    Authorization: `JWT token`,
    'Content-Type': 'application/json',
  },
  responseType: 'json',
};
const settings = {
  url: baseUrl + '/tests',
  method: 'get',
  aggregation: '*',
  body: {
    data: true,
  },
};
const request = aggregationBuilder(baseConfig, baseUrl, settings);
```
