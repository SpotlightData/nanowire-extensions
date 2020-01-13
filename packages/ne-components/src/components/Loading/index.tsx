import * as React from 'react';
import injectSheet from 'react-jss';
import cn from 'classnames';
import { Spin } from 'antd';
import { Dictionary } from 'ts-essentials';

const style = {
  container: {
    pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
  },
};
export interface LoadingBareClasses extends Dictionary<string> {
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
export const Loading = React.memo(injectSheet(style)(LoadingBare));
