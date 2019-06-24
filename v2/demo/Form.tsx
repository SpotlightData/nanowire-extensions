import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { Checkbox, TextField } from '../source';

export class FormDemo extends React.PureComponent {
  render() {
    return (
      <Form
        onSubmit={console.log}
        render={values => {
          return (
            <React.Fragment>
              <Field name="checkbox" render={p => <Checkbox {...p} label="Toggle" />} />
              <Field name="text" render={p => <TextField {...p} />} />
            </React.Fragment>
          );
        }}
      />
    );
  }
}
