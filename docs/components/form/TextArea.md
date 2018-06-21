# TextArea

### About

Wrapper for antd textare component, made to work with https://github.com/final-form/react-final-form

### Parameters

```javascript
const propTypes = {
  rows: PropTypes.number.isRequired,
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
  }).isRequired,
  placeholder: PropTypes.string,
};

const defaultProps = {
  placeholder: '',
};
```

`input` object will be passed to [ant design input component](https://ant.design/components/input/) as props

### Example

```javascript
import { TextArea } from '@spotlightdata/nanowire-extensions';

const props = {
  rows: 2,
  placeholder: 'test',
  input: {
    value: '',
    onChange: console.log,
  },
  meta: {},
};
const area = <TextArea {...props} />;
```
