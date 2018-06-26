import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export const withUppy = Child => {
  class UppyWrapper extends PureComponent {
    componentDidMount() {
      this.context.registerChild();
    }

    render() {
      const { uppy } = this.context;
      return <Child {...this.props} uppy={uppy} />;
    }
  }
  UppyWrapper.contextTypes = {
    uppy: PropTypes.shape({}).isRequired,
    registerChild: PropTypes.func.isRequired,
  };
  const childName = Child.displayName || Child.name;
  UppyWrapper.displayName = `withUppy(${childName})`;
  return UppyWrapper;
};
