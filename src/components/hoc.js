import React, { PureComponent } from 'react';
import hoistStatics from 'hoist-non-react-statics';

export const strictComponent = (predicate, onFail) => Component => {
  class Wrapper extends PureComponent {
    state = { checked: false };
    componentDidMount() {
      if (!predicate(this.props)) {
        onFail(this.props);
      } else {
        this.setState({ checked: true });
      }
    }

    render = () => {
      if (this.state.checked) {
        return <Component {...this.props} />;
      } else {
        return null;
      }
    };
  }
  const componentName = Component.displayName || Component.name;
  Wrapper.WrappedComponent = Component;
  Wrapper.displayName = `strictComponent(${componentName})`;
  return hoistStatics(Wrapper, Component);
};
