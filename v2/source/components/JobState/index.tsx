import * as React from 'react';

import { Steps } from 'antd';
import injectSheet from 'react-jss';

const style = {
  wrapper: {
    maxWidth: '600px',
  },
  header: {
    backgroundColor: '#fff',
    padding: '1em 2em',
    width: '100%',
  },
};

export interface JobStateBareClasses {
  wrapper: string;
  header: string;
}

export interface JobStateBareProps {
  classes: JobStateBareClasses;
  current: number;
  steps: string[];
}

export const JobStateBare: React.FC<JobStateBareProps> = props => {
  const { current, steps, classes } = props;

  return (
    <div className={classes.header}>
      <div className={classes.wrapper}>
        <Steps current={current}>
          {steps.map(text => (
            <Steps.Step title={text} key={text} />
          ))}
        </Steps>
      </div>
    </div>
  );
};

JobStateBare.defaultProps = {
  steps: ['Create job', 'Add files', 'Process'],
};

JobStateBare.displayName = 'JobState';

// @ts-ignore Seems to be a bug with propTypes ?
export const JobState = injectSheet(style)(JobStateBare);
