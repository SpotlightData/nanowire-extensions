# SidebarToggle

### About

Based on antd icon. Has styling and click handlers added.
It does not manage state internally that has to be done by the parent component

### Parameters

`classes` object is provided internally via `react-jss` but it can be overriden by passing `classes` prop

```javascript
const propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};
```

### Example

```javascript
import { SidebarToggle } from '@spotlightdata/nanowire-extensions';

const sidebar = <SidebarToggle open onClick={console.log} />;
```
