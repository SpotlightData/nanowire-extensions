import * as React from 'react';
import injectSheet from 'react-jss';
import cn from 'classnames';
import { Spin } from 'antd';

const style = {
  container: {
    pointerEvents: 'none',
  },
};
export interface LoadingBareClasses {
  container: string;
}

export interface LoadingBareProps {
  classes: LoadingBareClasses;
  className?: string;
}

export const LoadingBare: React.FC<LoadingBareProps> = ({ className, classes }) => {
  return (
    <div className={cn(classes.container, className || 'loading-spinner')}>
      <Spin size="large" />
    </div>
  );
};

LoadingBare.displayName = 'Loading';
// @ts-ignore
export const Loading = injectSheet(style)(LoadingBare);
