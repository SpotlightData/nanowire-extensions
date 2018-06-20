# JobState

### About

Header for showing job state progress. All classes can be overriden using classOverride prop

### Parameters

```javascript
const propTypes = {
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
  }),
  current: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string),
  classOverrides: PropTypes.shape({}),
};

const defaultProps = {
  steps: ['Create job', 'Add files', 'Process'],
  classOverrides: {},
};
```

### Example

```javascript
import { JobState } from '@spotlightdata/nanowire-extensions';

const header = <JobState current={1} />;
```
