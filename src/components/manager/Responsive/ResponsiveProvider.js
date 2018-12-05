import React, { Component, Children } from 'react';
import { element, shape, number } from 'prop-types';

import throttle from 'lodash.throttle';
import { getQueries } from './getQueries';
import { ResponsiveContext } from './context';
import { defaultBreakpoints } from './breakpoints';

const fakeWindow = { innerWidth: 0, innerHeight: 0 };

export class ResponsiveProvider extends Component {
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
  children: element.isRequired,
  container: shape({}),
  breakpoints: shape({
    xs: number.isRequired,
    sm: number.isRequired,
    md: number.isRequired,
    lg: number.isRequired,
    xl: number.isRequired,
    xll: number.isRequired,
  }),
  throttle: number,
};

ResponsiveProvider.defaultProps = {
  container: typeof window === 'undefined' ? fakeWindow : window,
  breakpoints: defaultBreakpoints,
  throttle: 400,
};
