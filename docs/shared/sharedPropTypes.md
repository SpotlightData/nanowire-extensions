# sharedPropTypes.js

## sharedPropTypes

### About

Common prop-type definitions made for code re-use

### Example

```javascript
LoginBare.propTypes = {
  // Will take { root: '', container: '' }
  classes: sharedPropTypes.classes(['root', 'form']).isRequired,
  history: sharedPropTypes.history.isRequired,
  location: sharedPropTypes.location.isRequired,
  match: sharedPropTypes.matchWith('userId').isRequired,
  // Will take { getUser, getJob }
  actions: sharedPropTypes.actions(['getUser', 'getJob']).isRequired,
  width: sharedPropTypes.numOrString.isRequired,
};
```
