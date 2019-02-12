import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';

import injectSheets from 'react-jss';
import style from './style';

export const SimpleProgressBarBare = ({ percent, format, classes }) => (
  <div className={classes.container}>
    <div>
      <Line percent={percent} strokeWidth="2" trailWidth="2" strokeColor="#108ee9" />
    </div>
    <span className={classes.container}>{format(percent)}</span>
  </div>
);

SimpleProgressBarBare.propTypes = {
  format: PropTypes.func.isRequired,
  percent: PropTypes.number.isRequired,
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export const SimpleProgressBar = injectSheets(style)(SimpleProgressBarBare);
