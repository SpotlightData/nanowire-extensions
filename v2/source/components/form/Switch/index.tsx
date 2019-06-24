import * as React from 'react';
import { Switch as AntSwitch } from 'antd';
import { FieldRenderProps } from 'react-final-form';

import { FieldError } from '../FieldError';
import { FieldWrapper } from '../FieldWrapper';

export interface SwitchProps extends FieldRenderProps<string, HTMLInputElement> {}

/**
 * Use String wrapper for input.value because react-final-form
 * can pass empty string as value in some cases
 */
export class Switch extends React.Component<SwitchProps> {
  componentWillMount() {
    const { input } = this.props;
    // Need to delay, otherwise it doesn't get updated
    setTimeout(() => {
      input.onChange(String(input.value) === 'true');
    }, 0);
  }

  render() {
    const { input, meta } = this.props;
    return (
      <FieldWrapper>
        <AntSwitch checked={String(input.value) === 'true'} onChange={input.onChange} />
        <FieldError meta={meta} />
      </FieldWrapper>
    );
  }
}
