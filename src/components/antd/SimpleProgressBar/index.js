import React from 'react';
import { func, number, shape } from 'prop-types';
import { Line } from 'rc-progress';

import { roundToN } from '../../../helpers/number';

const textStyle = {
  right: '0',
  top: '0.15em',
  width: '2em',
  position: 'absolute',
  color: 'rgba(0, 0, 0, 0.45)',
};

const formatPercent = percent => roundToN(1)(percent) + '%';

export const SimpleProgressBar = ({ percent, format, style }) => (
  <div style={{ position: 'relative' }}>
    <div style={{ paddingRight: '3em' }}>
      <Line percent={percent} strokeWidth="2" trailWidth="2" strokeColor="#108ee9" />
    </div>
    <span style={style}>{format(percent)}</span>
  </div>
);

SimpleProgressBar.propTypes = {
  format: func,
  percent: number.isRequired,
  style: shape({}),
};

SimpleProgressBar.defaultProps = {
  style: textStyle,
  format: formatPercent,
};
