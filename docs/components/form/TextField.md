# TextArea

### About

Wrapper for antd text field component, made to work with https://github.com/final-form/react-final-form

### Parameters

```javascript
const propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitError: PropTypes.string,
  }).isRequired,
  defaultValue: PropTypes.string,
};

const defaultProps = {
  type: '',
  placeholder: '',
  defaultValue: undefined,
  size: 'default',
};
```

`input` object will be passed to [ant design input component](https://ant.design/components/input/) as props

### Example

```javascript
import { TextField } from '@spotlightdata/nanowire-extensions';

const props = {
  input: { value: '', onChange: console.log, onPressEnter: console.log },
  meta: {},
};
const area = <TextField {...props} />;
```
