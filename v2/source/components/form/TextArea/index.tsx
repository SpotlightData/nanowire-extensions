import * as React from 'react';
import { Input } from 'antd';
import { FieldRenderProps } from 'react-final-form';
import { FieldError } from '../FieldError';
import { FieldWrapper } from '../FieldWrapper';

export interface TextAreaProps extends FieldRenderProps<string, HTMLTextAreaElement> {
  rows: number;
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = props => {
  const { input, meta, rows, ...rest } = props;
  return (
    <FieldWrapper>
      <Input.TextArea rows={rows} {...input} {...rest} />
      <FieldError meta={meta} />
    </FieldWrapper>
  );
};

TextArea.displayName = 'TextArea';
