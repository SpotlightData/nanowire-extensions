# Dropdown

### About

Wrapper for antd dropdown component, made to work with https://github.com/final-form/react-final-form

### Parameters

```javascript
const propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
  }).isRequired,
  options: PropTypes.shape({}).isRequired,
  label: PropTypes.string,
  maxWidth: PropTypes.number,
  defaultOption: PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  defaultOption: undefined,
  label: '',
  maxWidth: 100,
};
```

### Example

```javascript
import { Dropdown } from '@spotlightdata/nanowire-extensions';

const options = {
  test1: { key: 'test1', text: 'text1', disabled: false, value: 'value1' },
  test2: { key: 'test2', text: 'text2', disabled: false, value: 'value2' },
};

const props = {
  input: { value: '', onChange: console.log },
  label: 'Test label',
  meta: {},
  options,
};
const dropdown = <Dropdown {...props} />;
```
