# DragDrop

DragDrop plugin for uppy.

## Parameters

onFail function will be called if the file extension does not exist in `allowedExtensions` option

```javascript
const propTypes = {
  // Supplied by UppyProvider
  uppy: PropTypes.shape({
    removePlugin: PropTypes.func,
    getPlugin: PropTypes.func,
    use: PropTypes.func,
  }).isRequired,
  className: PropTypes.string,
  onFail: PropTypes.func.isRequired,
  options: PropTypes.shape({}),
};

const defaultProps = {
  className: '',
  options: {
    allowedExtensions,
  },
};
```

## Example Usage

```javascript
import { DragDropUploader} from '@spotlightdata/nanowire-extensions';

const uppy = Uppy({
  autoProceed: false,
});
const content(
  <UppyProvider uppy={uppy}>
    <DragDropUploader onFail={console.error} />
  </UppyProvider>
);
```
