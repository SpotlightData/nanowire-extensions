import * as React from 'react';
import { Loading } from '../Loading';
import { Row } from 'antd';
import { createUseStyles } from 'react-jss';
import cn from 'classnames';

const useStyles = createUseStyles({
  row: {
    height: 200,
  },
});

export const LoadingBox: React.FC<{ className?: string }> = ({ className }) => {
  const classes = useStyles();
  return (
    <Row className={cn('loading-box', className || classes.row)}>
      <Loading />
    </Row>
  );
};
