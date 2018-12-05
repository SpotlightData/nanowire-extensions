# ValidateSaved

### About

A component used to validate saved data asynchronously

### Parameters

```javascript
const propTypes = {
  // Content to display while validating
  loadingRender: func.isRequired,
  // Will be rendered after checks are complete
  contentRender: func.isRequired,
  // Should return user
  saved: any,
  // Format the user before trying to validate it
  format: func.isRequired,
  // Has to return a promise, will be called if getSaved returns a user
  validate: func.isRequired,
  // Will execute before content render if user is invalid
  whenInValid: func.isRequired,
  // Will execute before content render if user is valid
  whenValid: func.isRequired,
};

```

### Example

```javascript
import { ValidateSaved } from '@spotlightdata/nanowire-extensions';

<ValidateSaved
  saved={true}
  validate={() => false}
  format={a => !a}
  whenInValid={console.error}
  whenValid={console.log}
  contentRender={valid => valid ? 'valid' : 'invalid'}
  loadingRender={() => <span>Loading</span>}
/>
```
