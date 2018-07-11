# Responsive

## ResponsiveProvider

### About

Provider component that should sit on top of your application

### Parameters

- {ReactNode} [children] - Child components
- {Object} [container=window] - Container that will the listeners will be attached to

```javascript
ResponsiveProvider.propTypes = {
  children: PropTypes.element.isRequired,
  container: PropTypes.shape({}),
};

ResponsiveProvider.defaultProps = {
  container: window,
};

```

### Example

```javascript
import React from 'react';
import { ResponsiveProvider } from '@spotlightdata/nanowire-extensions';

const Layout = (props) => 'My layout';
const App = (
  <ResponsiveProvider>
    <Layout />
  </ResponsiveProvider>
);
```

## ResponsiveConsumer

### About

Consumer component that will supply queries and manage re-rendering

### Parameters

- {ReactNode | function } [children] - Child components
- {Function} [render] - Alternative render function

```javascript
ResponsiveConsumer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  render: PropTypes.func,
};

ResponsiveConsumer.defaultProps = {
  children: null,
  render: null,
};
```

### Example

```javascript
import React from 'react';
import { ResponsiveConsumer } from '@spotlightdata/nanowire-extensions';

const sidebar = (
  <ResponsiveConsumer>
    {({ xs }) => (
      <Sidebar isMobile={xs} />
    )}
  </ResponsiveConsumer>
);

```
