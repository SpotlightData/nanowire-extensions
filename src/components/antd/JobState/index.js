import React from 'react';
import PropTypes from 'prop-types';

import { Steps } from 'antd';
import sid from 'shortid';
import injectStyles from 'react-jss';

import style from './style';

const { Step } = Steps;

/**
 * Header for showing job state progress.
 * All classes can be overriden using classOverride prop
 * @example
 * const header = <JobState current={1} />;
 * @param {Object} props
 */
export const JobStateBare = props => {
  const { current, steps, classOverrides } = props;
  const classes = { ...props.classes, ...classOverrides };

  return (
    <div style={classes.header}>
      <div style={classes.wrapper}>
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
  }),
  current: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string),
  classOverrides: PropTypes.shape({}),
};

JobStateBare.defaultProps = {
  steps: ['Create job', 'Add files', 'Process'],
  classOverrides: {},
};

JobStateBare.displayName = 'JobState';

export const JobState = injectStyles(style)(JobStateBare);
