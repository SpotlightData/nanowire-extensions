# Either.js

## Either

### About

Helps to modify and manage responses in a more pure way.

### Parameters

It can either take an array in a form of `[left, right]` as a single argument or two arguments `(left, right)`

```jasvasript
constructor(left: any|[any, any], right: any, isLeft = false): Either

static from(arg1: any|[any, any], arg2: any, isLeft = false): Either
```

### Example

```javascript
import { Either } from '@spotlightdata/nanowire-extensions';

const left = null;
const right = 1;

const result = Either.from(left, right)
  .rightMap(a => a + 1)
  .rightOr(0);
```
