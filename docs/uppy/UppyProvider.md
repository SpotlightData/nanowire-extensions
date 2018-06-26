# UppyProvider

A provider component used to inject uppy into react components, should be used together with `withUppy` function

## Parameters

```javascript
const propTypes = {
  uppy: PropTypes.shape({}).isRequired,
  children: PropTypes.node,
};
```

## Example Usage

```javascript
import { DragDropUploader, UppyProvider } from '@spotlightdata/nanowire-extensions';

const uppy = Uppy({
  autoProceed: false,
});
const content(
  <UppyProvider uppy={uppy}>
    <DragDropUploader onFail={console.error} />
  </UppyProvider>
);
```
