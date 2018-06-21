# Timeline

### About

Wrapper for ant design's [Timeline](https://ant.design/components/timeline/) component

### Parameters

```javascript
const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  items: [],
  accessor: 'title',
};
```

### Example

```javascript
import { Timeline } from '@spotlightdata/nanowire-extensions';

const items = Array.from({ length: 11 }).map(() => ({ name: String(Math.random()) }));
const timeline = <Timeline items={items} accessor="name" />;
```
