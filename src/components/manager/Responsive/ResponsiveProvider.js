import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

import throttle from 'lodash.throttle';
import { getQueries } from './getQueries';
import { ResponsiveContext } from './context';

export class ResponsiveProvider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = getQueries(props.container);
    this.listen = throttle(this.updateSizes, props.throttle);
  }

  updateSizes = () => {
    this.setState(getQueries(this.props.container));
  };

  componentDidMount() {
    this.props.container.addEventListener('resize', this.listen);
    this.updateSizes();
  }

  componentWillUnmount() {
    this.props.container.removeEventListener('resize', this.listen);
  }

  render() {
    return (
      <ResponsiveContext.Provider value={this.state}>
        {Children.only(this.props.children)}
      </ResponsiveContext.Provider>
    );
  }
}

ResponsiveProvider.propTypes = {
  children: PropTypes.element.isRequired,
  container: PropTypes.shape({}),
};

ResponsiveProvider.defaultProps = {
  container: window,
};
