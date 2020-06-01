import * as React from 'react';
import injectSheet from 'react-jss';

export interface SimpleProgressBarClasses {
  container: string;
  success: string;
  failed: string;
}

export interface SimpleProgressBarBareProps {
  total: number;
  success: number;
  failed: number;
}

export interface SimpleProgressBarProps extends SimpleProgressBarBareProps {
  classes: SimpleProgressBarClasses;
}

const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    height: '8px',
    borderRadius: '100px',
    display: 'flex',
    overflow: 'hidden',
  },
  success: (props: SimpleProgressBarBareProps) => {
    const passed = (props.success / props.total) * 100;
    return { backgroundColor: '#52c41a', width: `${passed}%` };
  },
  failed(props: SimpleProgressBarBareProps) {
    const passed = (props.failed / props.total) * 100;
    return { backgroundColor: '#f5222d', width: `${passed}%` };
  },
};

const SimpleProgressBarBare: React.FC<SimpleProgressBarProps> = ({ classes }) => {
  return (
    <div className={classes.container}>
      <span className={classes.success} />
      <span className={classes.failed} />
    </div>
  );
};

// @ts-ignore
export const SimpleProgressBar = injectSheet<string, object, SimpleProgressBarBareProps>(styles)(
  // @ts-ignore
  SimpleProgressBarBare
);
