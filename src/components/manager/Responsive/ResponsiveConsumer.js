import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

import { ResponsiveContext } from './context';

export class ResponsiveConsumer extends PureComponent {
  renderChild = queries => {
    const { children, render, ...rest } = this.props;
    if (typeof children === 'function') {
      return children({ ...queries, ...rest });
    }
    if (typeof render === 'function') {
      return render({ ...queries, ...rest });
    }
    return children;
  };

  render() {
    return <ResponsiveContext.Consumer>{this.renderChild}</ResponsiveContext.Consumer>;
  }
}

ResponsiveConsumer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  render: PropTypes.func,
};

ResponsiveConsumer.defaultProps = {
  children: null,
  render: null,
};
