import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import { TableManagerContext } from './context';

class TableFilterCore extends Component {
  state = {
    value: '',
  };

  filter = items => {
    return this.props.filter(this.state.value, items);
  };

  onChange = e => {
    let value;
    if (typeof e === 'string' || typeof e === 'number') {
      value = String(e);
    } else if (typeof e.preventDefault === 'function') {
      value = e.target.value;
    } else {
      throw new Error('Could not extract value from change event');
    }
    this.setState({ value }, this.props.core.onChange);
  };

  componentDidMount() {
    this.unsubscribe = this.props.core.addFilter(this.filter);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  getRenderFn(children, Component) {
    if (typeof children === 'function') {
      return children;
    }
    if (Component !== undefined) {
      return props => <Component {...props} />;
    }
    return () => children;
  }

  render() {
    const { children, component, core, filter, ...rest } = this.props;
    const renderFn = this.getRenderFn(children, component);

    const renderProps = {
      input: {
        onChange: this.onChange,
        value: this.state.value,
      },
      ...rest,
    };

    return renderFn(renderProps);
  }
}

export const TableFilter = props => (
  <TableManagerContext.Consumer>
    {core => <TableFilterCore core={core} {...props} />}
  </TableManagerContext.Consumer>
);

TableFilter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  component: PropTypes.func,
  filter: PropTypes.func.isRequired,
};

TableFilter.defaultProps = {
  children: null,
  component: null,
};
