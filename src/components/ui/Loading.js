import React from 'react';
import PropTypes from 'prop-types';

import { Spin } from 'antd';

export const Loading = ({ className }) => (
  <div className={className}>
    <Spin size="large" />
  </div>
);

Loading.propTypes = {
  className: PropTypes.string,
};

Loading.defaultProps = {
  className: 'loading-spinner',
};

Loading.displayName = 'Loading';
