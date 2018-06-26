import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { DatePicker as AntDatePicker } from 'antd';

import { defaultFormat } from '../../../helpers/time';

const { RangePicker } = AntDatePicker;

export class DatePicker extends PureComponent {
  handleChange = (value, _) => {
    this.props.onFinished({ min: value[0].valueOf(), max: value[1].valueOf() });
  };

  render() {
    const { minValue, maxValue, format, ...rest } = this.props;
    return (
      <RangePicker
        value={[moment(minValue), moment(maxValue)]}
        onChange={this.handleChange}
        format={format}
        allowClear={false}
        {...rest}
      />
    );
  }
}

DatePicker.propTypes = {
  onFinished: PropTypes.func.isRequired,
  maxValue: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  format: PropTypes.string,
};

DatePicker.defaultProps = {
  format: defaultFormat,
};
