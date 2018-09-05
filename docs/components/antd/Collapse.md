# Collapse

### About

Re-write of ant design collapse component, with more customisation:

- Can fully customise the rendering of header
- Can specify extraContent to be placed in the header

### Parameters

```javascript
const propTypes = {
  collapsed: bool.isRequired,
  onClick: func.isRequired,
  extraContent: node,
  header: node,
  duration: number,
  headerRender: func,
};

const defaultProps = {
  header: null,
  extraContent: null,
  duration: 400,
  headerRender: null,
};
```

### Example

```javascript
import { CollapsiblePanel } from '@spotlightdata/nanowire-extensions';

const content = <CollapsiblePanel collapsed={true} onClick={console.log} />;
```
