import React, { Children } from 'react';
import PropTypes from 'prop-types';

import { ElasticContext } from './context';

export const ElasticProvider = props => (
  <ElasticContext.Provider value={props.request}>
    {Children.only(props.children)}
  </ElasticContext.Provider>
);

ElasticProvider.propTypes = {
  request: PropTypes.func.isRequired,
};
