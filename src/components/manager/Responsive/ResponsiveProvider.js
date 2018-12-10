import React, { Component } from 'react';
import { element, shape, number, func, bool } from 'prop-types';

import throttle from 'lodash.throttle';
import { getQueries } from './getQueries';
import { ResponsiveContext } from './context';
import { defaultBreakpoints } from './breakpoints';

const fakeWindow = { innerWidth: 0, innerHeight: 0 };

const getContainer = ({ getContainer, container }) =>
  typeof getContainer === 'function' ? getContainer() : container;

export class ResponsiveProvider extends Component {
  constructor(props) {
    super(props);
    this.state = this.calculate(props);
    this.listener = throttle(this.updateSizes, props.throttle);
  }

  updateSizes = () => {
    this.setState(this.calculate(this.props));
  };

  calculate(props) {
    return getQueries(getContainer(props), props.breakpoints);
  }

  componentDidMount() {
    if (this.props.runOnMount) {
      this.updateSizes();
    }
    getContainer(this.props).addEventListener('resize', this.listener);
  }

  componentWillUnmount() {
    getContainer(this.props).removeEventListener('resize', this.listener);
  }

  render() {
    return (
      <ResponsiveContext.Provider value={this.state}>
        {this.props.children}
      </ResponsiveContext.Provider>
    );
  }
}

ResponsiveProvider.propTypes = {
  children: element.isRequired,
  container: shape({}),
  getContainer: func,
  breakpoints: shape({
    xs: number.isRequired,
    sm: number.isRequired,
    md: number.isRequired,
    lg: number.isRequired,
    xl: number.isRequired,
    xll: number.isRequired,
  }),
  runOnMount: bool,
  throttle: number,
};

ResponsiveProvider.defaultProps = {
  container: typeof window === 'undefined' ? fakeWindow : window,
  breakpoints: defaultBreakpoints,
  throttle: 400,
  runOnMount: false,
};
