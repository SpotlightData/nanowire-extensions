import * as React from 'react';
import * as R from 'ramda';
import { Form, Field } from 'react-final-form';
import {
  Checkbox,
  TextField,
  Switch,
  Dropdown,
  ScrollListFieldSingle,
  ScrollListFieldMulti,
  DragDropField,
} from '../source';

const options = {
  FILE: { text: 'Local files' },
  ONEDRIVE: { text: 'One drive' },
  TWITTER: { text: 'Twitter scraping' },
  DATABASE: { text: 'Database', disabled: true },
};

const dragDrop = R.pipe(
  R.toPairs,
  R.map(([key, entry]: [string, { text: string }]) => ({ id: key, title: entry.text }))
)(options);

export class FormDemo extends React.PureComponent {
  render() {
    return (
      <Form
        onSubmit={console.log}
        initialValues={{
          'drag-drop': dragDrop,
        }}
        render={values => {
          return (
            <React.Fragment>
              <Field name="checkbox" render={p => <Checkbox {...p} label="Toggle" />} />
              <div style={{ margin: '2em 0' }} />
              <Field name="text" render={p => <TextField {...p} />} />
              <div style={{ margin: '2em 0' }} />
              <Field name="switch" render={p => <Switch {...p} />} />
              <div style={{ margin: '2em 0' }} />
              <Field
                name="switch"
                render={p => <Dropdown {...p} options={options} label="Options" />}
              />
              <div style={{ margin: '2em 0' }} />
              <Field
                name="switch-def"
                render={p => (
                  <Dropdown {...p} options={options} label="Options" defaultOption="FILE" />
                )}
              />
              <div style={{ margin: '2em 0' }} />
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
              <div style={{ margin: '2em 0' }} />
              <Field
                name="scroll-multi"
                render={p => (
                  <ScrollListFieldMulti
                    {...p}
                    items={options}
                    accessor={a => a.text}
                    height={100}
                  />
                )}
              />

              <div style={{ margin: '2em 0' }} />
              <Field name="drag-drop" render={p => <DragDropField {...p} />} />
            </React.Fragment>
          );
        }}
      />
    );
  }
}
