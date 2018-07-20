# table.js

## propSort

### About

Allows to sort objects by given key. Mainly

### Parameters

Function is curried

```jasvasript
propSort(key: string, a: number | string, b: number | string): number
```

### Example

```javascript
import { propSort } from '@spotlightdata/nanowire-extensions';
const sorter = propSort('name');
console.log(sorter({ name: 'a' }, { name: 'b' }));
```

## generateColumns

### About

Wrapper function applied on top of table columns.
Used for generating different column layouts for mobile and desktop 

### Parameters

```jasvasript
generateColumns(columns: Object[]): (bool => Object[])
```

### Example

```javascript
import {
	defaultTimeFormat,
	propSort,
	timeSort,
	generateColumns
} from '@spotlightdata/nanowire-extensions';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    sorter: propSort('title'),
  },
  {
    title: 'Date created',
    dataIndex: 'createdAt',
    render: defaultTimeFormat,
    sorter: timeSort('createdAt'),
    expandedOnly: true,
  },
  {
    title: 'Owner',
    dataIndex: 'config.author',
    sorter: propSort(['config', 'author']),
    expandedOnly: true,
  },
];

export default generateColumns(columns);

```
