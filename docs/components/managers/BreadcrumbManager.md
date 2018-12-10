# BreadcrumbManager

### About

This manager component listens to history changes and requests breadcrumbs, that it then displays.

### Parameters

```javascript
BreadcrumbManager.propTypes = {
  // If true will display BackCrumb otherwise SmartCrumb
  basic: bool.isRequired,
  className: string.isRequired,
};
```

### Example

```javascript
import { BreadcrumbManager } from '@spotlightdata/nanowire-extensions';

const getBreadcrumbs = () => {
  return {
    subscribe: fn => {
      fn(Either.from(left, right));
      return { unsubscribe: () => false };
    },
  };
};

const dumb = <BreadcrumbManager className="test" basic={true} icon="arrow" onClick={console.log} />
const smart = <BreadcrumbManager className="test" basic={false} history={window.history} getBreadcrumbs={getBreadcrumbs} />
```

## SmartBreadcrumb

### Parameters

```javascript
SmartBreadcrumb.propTypes = {
  // Function that will be asked the data of breadcrumbs, should return rxjs subscriber wrapped in Either class
  getBreadcrumbs: func.isRequired,
  // React-router-dom history
  history: shape({}).isRequired,
  loadingClass: string,
  containerClass: string,
};

SmartBreadcrumb.defaultProps = {
  loadingClass: 'loading-dots',
  containerClass: 'text-container',
};
```

## BackCrumb

### Parameters

```javascript
BackCrumb.propTypes = {
  onClick: func.isRequired,
  icon: string.isRequired,
};
```