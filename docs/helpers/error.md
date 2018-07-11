# error.js

## extractBackendError

### About

Extracts data from error message received from nanowire-backend

### Parameters

```jasvasript
extractBackendError(message: string): (error: Object) => (Object)
```

### Example

```javascript
import { tap, map } from 'rxjs/operators';
import { Either } from '@spotlightdata/nanowire-extensions';


export function userLogin(backEnd, dispatch) {
  return (body) =>
    backEnd({
      method: 'POST',
      url: '/users/login',
      body,
    }).pipe(
      map(Either.leftMap(backEndError('Failed to login')))
    );
}
```
