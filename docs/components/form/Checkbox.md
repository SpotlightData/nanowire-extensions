# Badge

### About

Wrapper for antd checkbox component, made to work with https://github.com/final-form/react-final-form

### Parameters

```javascript
const propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    checked: PropTypes.bool,
  }).isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.bool,
};

const defaultProps = {
  defaultValue: false,
};
```

`input` object will be passed to [ant design input component](https://ant.design/components/input/) as props

### Example

```javascript
import { Checkbox } from '@spotlightdata/nanowire-extensions';

const props = {
  input: { checked: false, onChange: console.log },
  label: 'Test label',
  defaultValue: true,
};
const badge = <Checkbox {...props} />;
```
