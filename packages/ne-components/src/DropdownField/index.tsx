import React from 'react';

import { FieldError } from '../FieldError';
import { FieldRenderProps } from 'react-final-form';
import { FieldWrapper } from '../FieldWrapper';
import { DropdownProps, Dropdown } from '../Dropdown';

export interface DropdownFieldProps extends FieldRenderProps<string, HTMLTextAreaElement> {
  maxWidth?: number;
  options: DropdownProps['options'];
  label: string;
}

export const DropdownField: React.FC<DropdownFieldProps> = ({ input, meta, ...rest }) => {
  return (
    <FieldWrapper>
      <Dropdown value={input.value} onChange={input.onChange} {...rest} />
      <FieldError meta={meta} />
    </FieldWrapper>
  );
};
