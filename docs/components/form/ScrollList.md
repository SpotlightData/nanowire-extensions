# ScrollList

### About

Created for when we have lists that are too large. Creates vertically scrollable table.

### Parameters

```javascript
const propTypes = {
  items: PropTypes.shape({}).isRequired,
  accessor: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  isActive: PropTypes.func,
  classes: PropTypes.shape({
    row: PropTypes.string.isRequired,
    activeRow: PropTypes.string.isRequired,
    table: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
```

### Example

```javascript
import { ScrollList } from '@spotlightdata/nanowire-extensions';

const props = {
  items: { key1: { text: 't1' }, key2: { text: 't2' } },
  accessor: a => a.text,
  height: 200,
  isActive: a => false,
  onClick: console.log,
};
const list = <ScrollList {...props} />;
```
