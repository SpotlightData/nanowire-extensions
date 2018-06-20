import React, { PureComponent } from 'react';
import hoistStatics from 'hoist-non-react-statics';

export const strictComponent = (predicate, onFail) => Component => {
  class Wrapper extends PureComponent {
    componentDidMount() {
      if (!predicate(this.props)) {
        onFail(this.props);
      }
    }

    render = () => <Component {...this.props} />;
  }
  const componentName = Component.displayName || Component.name;
  Wrapper.WrappedComponent = Component;
  Wrapper.displayName = `strictComponent(${componentName})`;
  return hoistStatics(Wrapper, Component);
};
