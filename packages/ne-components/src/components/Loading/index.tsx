import * as React from 'react';
import { createUseStyles } from 'react-jss';
import cn from 'classnames';
import { Spin } from 'antd';

const useClasses = createUseStyles({
  container: {
    pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
  },
});

export interface LoadingProps {
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ className }) => {
  const classes = useClasses();
  return (
    <div className={cn('loading-spinner', className || classes.container)}>
      <Spin size="large" />
    </div>
  );
};
