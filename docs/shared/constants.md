# constants.js

## placeHolderSub

### About

Used for placeholding rxjs subscriptions.
This is a failsafe if subscription gets cancelled before it's initiated.

### Example

```javascript
import React, { Component } from 'react';
import { placeHolderSub } from '@spotlightdata/nanowire-extensions';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

export class Home extends PureComponent {
  state = {
    changelog: '',
  };

  changeLog$ = placeHolderSub;

  componentDidMount() {
    const self = this;

    self.changeLog$ = ajax({ url: '/static/changelog.md', responseType: 'text' })
      .pipe(map(req => req.response))
      .subscribe(changelog => self.setState({ changelog }));
  }

  componentWillUnmount() {
    this.changeLog$.unsubscribe();
  }

  render() {
  	return 'Home';
  }
}
```

## identity

### About

A function that returns whatever it's called with.
Takes only 1 argumment and returns it back.

### Example

```javascript
import { identity } from '@spotlightdata/nanowire-extensions';

const isDev = true;
const tap = isDev ? console.log : identity;

[1, 2, 3].map(tap);
```
