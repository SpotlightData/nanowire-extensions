# Loading

### About

Wrapper for antd progress component. Main purpose is to allow the use of more structured data.

### Parameters

```javascript
const propTypes = {
  progress: PropTypes.shape({
    total: PropTypes.number,
    left: PropTypes.number,
    failed: PropTypes.number,
  }).isRequired,
  text: PropTypes.string,
};

const defaultProps = {
  text: undefined,
};
```

### Example

```javascript
import { ProgressBar } from '@spotlightdata/nanowire-extensions';

const props = {
  progress: {
    total: 100,
    left: 0,
    failed: 0,
  },
};
const progress = <ProgressBar {...props} />;
```
