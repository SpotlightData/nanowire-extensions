# Table

### About

Wrapper for ant design table with default props

### Parameters

We provide default props that can be overriden

```javascript
const defaultTableProps = {
  rowKey: record => record._id,
  locale: { emptyText: 'No results' },
  pagination: {
    pageSize: 10,
  },
  size: 'middle',
};
```

https://ant.design/components/table/

### Example

```javascript
import { Table } from '@spotlightdata/nanowire-extensions';

const table = <Table columns={[]} dataSource={[]} />;
```
