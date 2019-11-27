import React from 'react';

import { FieldError } from '../FieldError';
import { FieldRenderProps } from 'react-final-form';
import { FieldWrapper } from '../FieldWrapper';
import { DropdownProps, Dropdown, Key } from '../Dropdown';

export interface DropdownFieldProps<K extends Key>
  extends FieldRenderProps<string, HTMLTextAreaElement>,
    Omit<DropdownProps<K>, 'onChange' | 'value'> {}

export function DropdownField<K extends Key>({
  input,
  meta,
  ...rest
}: DropdownFieldProps<K>): React.ReactElement {
  return (
    <FieldWrapper>
      <Dropdown value={input.value as K} onChange={input.onChange} {...rest} />
      <FieldError meta={meta} />
    </FieldWrapper>
  );
}
