import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import { ResponsiveContext } from './context';

export const ResponsiveConsumer = props => {
  const renderChild = queries => {
    const { children, render, ...rest } = props;
    if (typeof children === 'function') {
      return children({ ...queries, ...rest });
    }
    if (typeof render === 'function') {
      return render({ ...queries, ...rest });
    }
    return children;
  };
  return <ResponsiveContext.Consumer>{renderChild}</ResponsiveContext.Consumer>;
};

ResponsiveConsumer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  render: PropTypes.func,
};

ResponsiveConsumer.defaultProps = {
  children: null,
  render: null,
};
