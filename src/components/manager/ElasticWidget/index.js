import React from 'react';

import { ElasticContext } from './context';
import { ElasticConsumer } from './ElasticConsumer';

export { ElasticProvider } from './ElasticProvider';

export const ElasticWidget = props => (
  <ElasticContext.Consumer>
    {request => <ElasticConsumer request={request} {...props} />}
  </ElasticContext.Consumer>
);
