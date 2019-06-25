import * as React from 'react';
import { Input } from 'antd';
import { FieldRenderProps } from 'react-final-form';
import { FieldError } from '../FieldError';
import { InputProps } from 'antd/lib/input';
import { FieldWrapper } from '../FieldWrapper';

export interface TextFieldProps extends FieldRenderProps<string, HTMLInputElement> {
  defaultValue?: string;
  size: InputProps['size'];
}

export class TextField extends React.Component<TextFieldProps> {
  static defaultProps = {
    defaultValue: undefined,
    size: 'default',
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
  render() {
    const { input, meta, defaultValue, ...rest } = this.props;
    return (
      <FieldWrapper>
        <Input {...input} {...rest} />
        <FieldError meta={meta} />
      </FieldWrapper>
    );
  }
}

// @ts-ignore
TextField.displayName = 'TextFieldForm';
