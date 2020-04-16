import * as React from 'react';

import moment, { Moment } from 'moment';
import { DatePicker as AntDatePicker } from 'antd';

import { defaultFormat } from '@spotlightdata/ne-helpers';
import { RangePickerBaseProps } from 'antd/lib/date-picker/generatePicker';

const { RangePicker } = AntDatePicker;

export interface DatePickerProps extends Omit<RangePickerBaseProps<Moment>, 'picker'> {
  minValue: string | number;
  maxValue: string | number;
  onFinished: (range: { min: number; max: number }) => void;
  format?: string;
}

export class DatePicker extends React.Component<DatePickerProps> {
  handleChange = (value, _): void => {
    this.props.onFinished({ min: value[0].valueOf(), max: value[1].valueOf() });
  };

  render() {
    const { minValue, maxValue, format, ...rest } = this.props;
    return (
      <RangePicker
        value={[moment(minValue), moment(maxValue)]}
        onChange={this.handleChange}
        format={format || defaultFormat}
        allowClear={false}
        {...rest}
      />
    );
  }
}
