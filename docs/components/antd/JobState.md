# JobState

### About

Header for showing job state progress. Uses https://ant.design/components/steps/

### Parameters

```javascript
const propTypes = {
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
  }),
  current: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  steps: ['Create job', 'Add files', 'Process'],
};
```

### Example

```javascript
import { JobState } from '@spotlightdata/nanowire-extensions';

const header = <JobState current={1} />;
```
