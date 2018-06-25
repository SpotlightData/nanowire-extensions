# ChartManager

### About

Manager component made to ease the pain of working with vega charts in react.
All of the data is queried from elastic search

### Parameters

- {Object} [connection] - Parameters that will be passed to requestBuilder function
- {Object[]} [specs] - Graph specifications
- {{ handlers: Object, schemas: Object }} [chartLib] - Object that will be used to select charts and handlers
- {?Object} [initialValues] - Object that will be passed to `hasEnough` function of a handler to check if an additional request is needed
- {?Object} [queryProp] - Object that will be passed to `query` function of a handler.
- {Function} [requestBuilder] - Function that will return another function to be used to make external requests
- {?Function} [renderer] - Custom render function that the children charts will be passed to.

```javascript
const propTypes = {
  connection: PropTypes.shape({
    resourceId: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
  specs: PropTypes.arrayOf(
    PropTypes.shape({
      handler: PropTypes.string.isRequired,
      charts: PropTypes.arrayOf(PropTypes.string).isRequired,
      listeners: PropTypes.shape({}),
      Parent: PropTypes.node,
      parentProps: PropTypes.shape({}),
    })
  ).isRequired,
  chartLib: PropTypes.shape({
    handlers: PropTypes.shape({}).isRequired,
    schemas: PropTypes.shape({}).isRequired,
  }).isRequired,
  initialValues: PropTypes.shape({}),
  queryProp: PropTypes.shape({}),
  requestBuilder: PropTypes.func.isRequired,
  renderer: PropTypes.func,
};

const defaultProps = {
  initialValues: {},
  queryProp: {},
  renderer: undefined,
};
```

### Example

```javascript
import { ChartManager } from '@spotlightdata/nanowire-extensions';

const chartManagerProps = {
  connection: {
    token: 'test-token',
    level: 'PROJECT',
    resourceId: 'projectId',
  },
  specs: [
    {
      charts: ['scatterplotSentiment'],
      handler: 'projectSentiment',
      listeners: { select: console.log },
    },
    {
      charts: ['scatterplotReadability'],
      handler: 'projectReadability',
      listeners: { select: console.log },
    },
    { charts: ['piechart'], handler: 'projectFileTypes' },
    {
      charts: ['treemap'],
      handler: 'projectFileSize',
      listeners: { select: console.log },
    },
  ],
  queryProp: { projectId: 'test' },
};

const charts = <ChartManager {...chartManagerProps} />;
```
