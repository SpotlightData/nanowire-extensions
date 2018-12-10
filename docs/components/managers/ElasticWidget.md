# ElasticWidget

## ElasticProvider

### About

Provider component that should sit on top of your application

### Parameters

- {Func} [request] - A function used to requrest for data. Should return object containing `subscribe` method that returns `unsubscribe`, when called. 

```javascript
ElasticProvider.propTypes = {
  request: func.isRequired,
};

```

### Example

```javascript
import React from 'react';
import { ElasticProvider } from '@spotlightdata/nanowire-extensions';

const fakeRequest = () => ({ subscribe: () => ({ unsubscribe: () => false }) })
const Layout = (props) => 'My layout';
const App = (
  <ElasticProvider request={fakeRequest}>
    <Layout />
  </ElasticProvider>
);
```

## ElasticWidget

### About

Widget that will wrap seperate functions to produce a single component

### Parameters

```javascript
ElasticConsumer.propTypes = {
  loadRender: func,
  initialValue: any,
  // Some components will need to request the data manually
  manualFetch: bool,
  queryProp: any,
  // BEFORE request is made validate if there is enough data to render, just using initialValue
  hasEnough: func,
  // Builds elastic search query
  makeQuery: func.isRequired,
  // Custom rendering function that will be passed the data. If returns false, nothing is rendered
  render: func.isRequired,
  // Function that the query will be passed to
  // MUST return an rxjs observable or return object with .subscribe(fn) method
  request: func.isRequired,
  throttle: number,
};

```

### Example

```javascript
import React from 'react';
import { ElasticWidget } from '@spotlightdata/nanowire-extensions';

export const CategoryChart = props => (
  <ElasticWidget {...props} makeQuery={() => ({ size: 20 })} render={(data) => null} />
); 
```
