# FileTable

File table component to display files held in uppy storage

## Parameters

```javascript
const propTypes = {
  // Provided by UppyProvider
  uppy: PropTypes.shape({
    removeFile: PropTypes.func,
    getPlugin: PropTypes.func,
    getState: PropTypes.func,
    use: PropTypes.func,
    on: PropTypes.func,
    off: PropTypes.func,
  }).isRequired,
  className: PropTypes.string,
  footerRender: PropTypes.func.isRequired,
  headerRender: PropTypes.func,
  createColumns: PropTypes.func,
};

const defaultProps = {
  className: '',
  createColumns: createDefaultColumns,
};
```

## Example Usage

```javascript
import { UppyFileTable } from '@spotlightdata/nanowire-extensions';

const uppy = Uppy({
  autoProceed: false,
});
const content(
  <UppyProvider uppy={uppy}>
    <UppyFileTable footerRender={files => null} />
  </UppyProvider>
);
```
