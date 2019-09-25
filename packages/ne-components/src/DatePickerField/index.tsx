import * as React from 'react';
import { DatePicker } from '../DatePicker';
import { FieldRenderProps } from 'react-final-form';
import { FieldWrapper } from '../FieldWrapper';
import { FieldError } from '../FieldError';

interface DateRange {
  min: number;
  max: number;
}

export interface DatePickerFieldProps extends FieldRenderProps<DateRange, HTMLDivElement> {}
export const DatePickerField: React.FC<DatePickerFieldProps> = props => {
  const { input, meta } = props;
  const { min, max } = input.value;

  if (typeof input === 'string') {
    throw new TypeError(`Pass {min;max} value to DatePickerField component as initialValue`);
  }

  const onFinished = (range: DateRange) => {
    input.onChange(range);
  };

  return (
    <FieldWrapper>
      <DatePicker minValue={min} maxValue={max} onFinished={onFinished} />
      <FieldError meta={meta} />
    </FieldWrapper>
  );
};
