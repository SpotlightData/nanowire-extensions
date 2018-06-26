# Switch

### About

Wrapper for antd switch component, made to work with https://github.com/final-form/react-final-form

### Parameters

```javascript
const propTypes = {
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitError: PropTypes.string,
  }).isRequired,
};
```

### Example

```javascript
import { Switch } from '@spotlightdata/nanowire-extensions';

const props = { input: { value: 'true', onChange: console.log }, meta: {} };
render(<Switch {...props} />);
```
