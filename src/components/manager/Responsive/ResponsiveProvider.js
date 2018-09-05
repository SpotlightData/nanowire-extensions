import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

import throttle from 'lodash.throttle';
import { getQueries } from './getQueries';
import { ResponsiveContext } from './context';
import { defaultBreakpoints } from './breakpoints';

const fakeWindow = { innerWidth: 0, innerHeight: 0 };

export class ResponsiveProvider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.calculate(props);
    this.listen = throttle(this.updateSizes, props.throttle);
  }

  updateSizes = () => {
    this.setState(this.calculate(this.props));
  };

  calculate(props) {
    return getQueries(props.container, props.breakpoints);
  }

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
  breakpoints: PropTypes.shape({
    xs: PropTypes.number.isRequired,
    sm: PropTypes.number.isRequired,
    md: PropTypes.number.isRequired,
    lg: PropTypes.number.isRequired,
    xl: PropTypes.number.isRequired,
    xll: PropTypes.number.isRequired,
  }),
};

ResponsiveProvider.defaultProps = {
  container: typeof window === 'undefined' ? fakeWindow : window,
  breakpoints: defaultBreakpoints,
};
