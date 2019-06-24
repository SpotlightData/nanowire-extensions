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
  componentWillMount() {
    const { defaultValue, input } = this.props;
    if (defaultValue) {
      input.onChange(defaultValue);
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

// @ts-ignore
Checkbox.defaultProps = {
  defaultValue: false,
};
