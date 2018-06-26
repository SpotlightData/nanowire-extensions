# backend.js

## configureBackEnd

### About

Helps to configure outgoing connections to the backend, but it can also be used for regular requests as well.
Under the hood it uses `rxjs` so after request is made `subscribe` method should be called. The `unsubscribe` method can also be called to cancel the request.

### Parameters

- onRequest - Function to be called after each request is made
- request - Function that will be used to make the request, has to return an rxjs observable
- token - JWT token to be passed as authorization header
- baseUrl - Prefix to the url (for exaple '/v1' '/api')

Then a function is returned that should be used to communicate with external services

- hasBase - Optional. Whether the base should be used, should be false when making external requests
- aggregation - Optional. jmesPath string that will be used to extract requested data
- body/data - Optional. Can supply either, was made for backwards compatability
- settings - Rest of the configuration. Settings can be found [here](https://github.com/Reactive-Extensions/RxJS-DOM/blob/master/doc/operators/ajax.md)

```jasvasript
function configureBackEnd(onRequest, request = ajax) {
  // ...
  return (token, baseUrl, extraConfig = {}) => {
    // ...
    return ({ hasBase = true, data, body, ...settings }) => (): rxjs
```

### Example

```javascript
import { configureBackEnd } from '@spotlightdata/nanowire-extensions';

const request = configureBackEnd()('token', '/api');
request({
  method: 'get',
  url: '/test',
}).subscribe(console.log);
```
