# withUppy

Higher order function to inject uppy inside of react components, should be used together with `UppyProvider`

## Parameters

Just requires a react component to be passed.

## Example Usage

```javascript
import { withUppy } from '@spotlightdata/nanowire-extensions';

const ComponentBare = props => null;
const Component = withUppy(ComponentBare);
```
