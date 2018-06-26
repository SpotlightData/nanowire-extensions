import React from 'react';
import PropTypes from 'prop-types';

import { Steps } from 'antd';
import sid from 'shortid';
import injectStyles from 'react-jss';

import style from './style';

const { Step } = Steps;

export const JobStateBare = props => {
  const { current, steps, classOverrides } = props;
  const classes = { ...props.classes, ...classOverrides };
  return (
    <div className={classes.header}>
      <div className={classes.wrapper}>
        <Steps current={current}>
          {steps.map(text => <Step title={text} key={sid.generate()} />)}
        </Steps>
      </div>
    </div>
  );
};

JobStateBare.propTypes = {
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
  }).isRequired,
  current: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string),
};

JobStateBare.defaultProps = {
  steps: ['Create job', 'Add files', 'Process'],
};

JobStateBare.displayName = 'JobState';

export const JobState = injectStyles(style)(JobStateBare);
