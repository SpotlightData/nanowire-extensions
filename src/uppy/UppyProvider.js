import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class UppyProvider extends Component {
  state = {
    mounted: true,
  };

  getChildContext() {
    const { uppy } = this.props;
    return { uppy, registerChild: this.registerChild };
  }

  componentDidMount() {
    this.childCount = 0;
  }

  registerChild = () => {
    this.childCount += 1;
    if (this.childCount === this.props.children.length) {
      this.props.uppy.run();
    }
  };

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

UppyProvider.propTypes = {
  uppy: PropTypes.shape({
    close: PropTypes.func,
    run: PropTypes.func,
  }).isRequired,
  children: PropTypes.node,
};

UppyProvider.childContextTypes = {
  uppy: PropTypes.shape({
    close: PropTypes.func,
    run: PropTypes.func,
  }).isRequired,
  registerChild: PropTypes.func.isRequired,
};
