# time.js

## detailedTimeFormat

### About

Converts common date formats to our more detailed format `Do MMM YYYY h:mm:ss a`

### Parameters

```
detailedTimeFormat(date: string|number):string
```

### Example

```javascript
import { detailedTimeFormat } from '@spotlightdata/nanowire-extensions';

const now = new Date().toString();
detailedTimeFormat(now);
```

## defaultTimeFormat

### About

Converts common date formats to our default format `Do MMM YYYY`

### Parameters

```
defaultTimeFormat(date: string|number):string
```

### Example

```javascript
import { defaultTimeFormat } from '@spotlightdata/nanowire-extensions';

const now = new Date().toString();
defaultTimeFormat(now);
```

## timeSort

### About

Allows to specify time sorter for objects. Mainly used inside antd table column sorting

### Parameters

```
timeSort(keyAccess: string|any => string): (a, b) => -1|0|1
```

### Example

```javascript
import { timeSort } from 'helpers/time';
const columns = {
  title: 'Date created',
  dataIndex: 'createdAt',
  sorter: timeSort('createdAt'),
  width: 120,
};
```
