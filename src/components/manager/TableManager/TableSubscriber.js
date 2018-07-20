import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import { TableManagerContext } from './context';

class TableSubscriberCore extends Component {
  state = {
    items: [],
  };

  onChange = items => {
    this.setState({ items });
  };

  componentDidMount() {
    this.unsubscribe = this.props.core.addSubscriber(this.onChange);
    // To get inital values
    this.props.core.onChange();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    return this.props.render(this.state.items);
  }
}

export const TableSubscriber = props => (
  <TableManagerContext.Consumer>
    {core => <TableSubscriberCore core={core} {...props} />}
  </TableManagerContext.Consumer>
);

TableSubscriber.propTypes = {
  render: PropTypes.func.isRequired,
};
