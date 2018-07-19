import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import shallowequal from 'shallowequal';

import { TableManagerContext } from './context';
import { createCore } from './core';

export class TableProvider extends Component {
  state = {
    core: undefined,
  };

  componentDidMount() {
    this.setState({
      core: createCore(this.props.items),
    });
  }

  componentDidUpdate(prevProps, _prevState) {
    if (!shallowequal(prevProps, this.props)) {
      this.state.core.update(this.props.items);
    }
  }

  render() {
    const { core } = this.state;
    if (!core) {
      return null;
    }
    return (
      <TableManagerContext.Provider value={core}>
        <React.Fragment>{this.props.children}</React.Fragment>
      </TableManagerContext.Provider>
    );
  }
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array.isRequired,
};

TableProvider.defaultProps = {
  container: window,
};
