# TableManager

## TableProvider

### About

Provider component that should wrap all the other table components

### Parameters

- {ReactNode} [children] - Child components
- {any[]} [items] - Array of content that the filters and subscribers will work on

```javascript
TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array.isRequired,
};
```

### Example

```javascript
import React from 'react';
import { TableProvider, TableSubscriber } from '@spotlightdata/nanowire-extensions';

const items = [{ test: 'test' }];
const App = (
  <TableProvider items={items}>
    <TableSubscriber render={(content) => {
      return <div>{content[0].test}</div>;
    }} />
  </TableProvider>
)
```

## TableFilter

### About

Consumer component that will filter the content supplied by TableProvider
All props will be passed through to the component

### Parameters

- {ReactNode | function } [children] - Child components
- {ReactComponent} [component] - Alternative to using children
- {(string, T[]) => T[]} [filter] - Function that specifies how items will be filtered

```javascript
TableFilter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  component: PropTypes.func,
  filter: PropTypes.func.isRequired,
};

TableFilter.defaultProps = {
  children: null,
  component: null,
};
```

### Example

```javascript
import React from 'react';
import { TableProvider, TableSubscriber, TableFilter, TextField } from '@spotlightdata/nanowire-extensions';

const items = [{ test: 'test' }, { test: 'test2'}];
const filter = (value, list) => list.filter(item => item.test.includes(value));

const App = (
  <TableProvider items={items}>
    <React.Fragment>
      <TableFilter
        component={TextField}
        filter={filter}
        meta={{}}
        placeholder="Search for test"
      />
      <TableSubscriber render={(content) => {
        if (content.length === 0) {
          return 'Nothing found';
        }
        return <div>{content[0].test}</div>;
      }} />
    </React.Fragment>
  </TableProvider>
)
```


## TableSubscriber

### About

Component meant to use the content served by the provider

### Parameters

- {function} [render] - Render function, that will be given content from provider

```javascript
TableSubscriber.propTypes = {
  render: PropTypes.func.isRequired,
};
```

### Example

```javascript
import React from 'react';
import { TableProvider, TableSubscriber } from '@spotlightdata/nanowire-extensions';

const items = [{ test: 'test' }];
const App = (
  <TableProvider items={items}>
    <TableSubscriber render={(content) => {
      return <div>{content[0].test}</div>;
    }} />
  </TableProvider>
)
```
