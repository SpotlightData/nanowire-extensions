# DatePicker

### About

A wrapper for ant designs `RangePicker`

### Parameters

https://ant.design/components/date-picker/

```javascript
const propTypes = {
  onFinished: PropTypes.func.isRequired,
  maxValue: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  format: PropTypes.string,
};

const defaultProps = {
  format: defaultFormat,
};
```

### Example

```javascript
import { DatePicker } from '@spotlightdata/nanowire-extensions';

const picker = (
  <DatePicker minValue={Date.now() - 260000} maxValue={Date.now()} onFinished={console.log} />
);
```
