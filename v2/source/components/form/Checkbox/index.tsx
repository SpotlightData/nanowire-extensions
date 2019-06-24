import * as React from 'react';

import { FieldRenderProps } from 'react-final-form';
import { Checkbox as CheckboxInput } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FieldWrapper } from '../FieldWrapper';

export interface CheckboxProps extends FieldRenderProps<boolean, HTMLInputElement> {
  defaultValue?: boolean;
  label: string;
}

export class Checkbox extends React.Component<CheckboxProps> {
  static defaultProps = {
    defaultValue: false,
  };
  componentWillMount() {
    const { defaultValue, input } = this.props;
    if (defaultValue) {
      // Need to delay, otherwise it doesn't get updated
      setTimeout(() => {
        input.onChange(defaultValue);
      }, 0);
    }
  }

  onChange = (e: CheckboxChangeEvent) => {
    this.props.input.onChange(e.target.checked);
  };

  render() {
    const { onChange, ...rest } = this.props.input;
    return (
      <FieldWrapper>
        <CheckboxInput {...rest} onChange={this.onChange}>
          {this.props.label}
        </CheckboxInput>
      </FieldWrapper>
    );
  }
}