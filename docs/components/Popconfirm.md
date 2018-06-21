# Popconfirm

### About

The only thing this does is provide a wrapper for Popconfirm antd component with some default props

### Parameters

Passed default props

```javascript
const defaultPopConfirmProps = {
  placement: 'top',
  okText: 'Yes',
  cancelText: 'No',
  title: 'Are you sure you want to delete this?',
};
```

https://ant.design/components/popconfirm/

### Example

```javascript
import { Popconfirm } from '@spotlightdata/nanowire-extensions';

const button = (
  <Popconfirm>
    <button>delete</button>
  </Popconfirm>
);
```
