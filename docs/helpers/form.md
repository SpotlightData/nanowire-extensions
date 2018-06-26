# form.js

## validateSchema

### About

Wrapper to improve yup schema validation
https://github.com/jquense/yup

### Parameters

```jasvasript
validateSchema(schema: YupSchema, data: any, options: YupOptions)
```

### Example

```javascript
import yup from 'yup';
import { validateSchema } from '@spotlightdata/nanowire-extensions';

const userData = {
  email: 'test',
  password: '222'
  remember: false,
};

const USER_LOGIN_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email()
    .label('Email')
    .required(),
  password: yup.string().required(),
  remember: yup.bool().required(),
});

const error = validateSchema(USER_LOGIN_SCHEMA, userData);
if (error) {
  console.error('Failed')
}
```
