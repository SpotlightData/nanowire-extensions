import * as React from 'react';
import { Input } from 'antd';
import { FieldRenderProps } from 'react-final-form';
import { FieldError } from '../FieldError';

export interface TextAreaProps extends FieldRenderProps<string, HTMLTextAreaElement> {
  rows: number;
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = props => {
  const { input, meta, rows, ...rest } = props;
  return (
    <div className="field">
      <Input.TextArea rows={rows} {...input} {...rest} />
      <FieldError meta={meta} />
    </div>
  );
};

TextArea.displayName = 'TextArea';
