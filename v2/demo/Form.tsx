import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { Checkbox, TextField, Switch, Dropdown, ScrollListFieldSingle } from '../source';

export const options = {
  FILE: { text: 'Local files' },
  ONEDRIVE: { text: 'One drive' },
  TWITTER: { text: 'Twitter scraping' },
  DATABASE: { text: 'Database', disabled: true },
};

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
              <Field name="switch" render={p => <Switch {...p} />} />
              <Field
                name="switch"
                render={p => <Dropdown {...p} options={options} label="Options" />}
              />
              <Field
                name="switch-def"
                render={p => (
                  <Dropdown {...p} options={options} label="Options" defaultOption="FILE" />
                )}
              />
              <Field
                name="scroll-single"
                render={p => (
                  <ScrollListFieldSingle
                    {...p}
                    items={options}
                    accessor={a => a.text}
                    height={100}
                  />
                )}
              />
            </React.Fragment>
          );
        }}
      />
    );
  }
}
