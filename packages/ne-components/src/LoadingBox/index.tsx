import * as React from 'react';
import { Loading } from '../Loading';
import { Row } from 'antd';

const style = { height: '200px' };
export const LoadingBox: React.FC<{}> = React.memo(({}) => {
  return (
    <Row style={style}>
      <Loading />
    </Row>
  );
});
