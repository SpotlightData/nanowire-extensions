import * as React from 'react';
import { Switch as AntSwitch } from 'antd';
import { FieldRenderProps } from 'react-final-form';

import { FieldError } from '../FieldError';
import { FieldWrapper } from '../FieldWrapper';

export interface SwitchProps extends FieldRenderProps<boolean, HTMLInputElement> {}

/**
 * Use String wrapper for input.value because react-final-form
 * can pass empty string as value in some cases
 */
export class Switch extends React.Component<SwitchProps> {
  render() {
    const { input, meta } = this.props;
    return (
      <FieldWrapper>
        <AntSwitch checked={input.value} onChange={(checked: boolean) => input.onChange(checked)} />
        <FieldError meta={meta} />
      </FieldWrapper>
    );
  }
}
