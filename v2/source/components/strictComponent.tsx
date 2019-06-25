import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';

interface StrictComponentState {
  checked: boolean;
}

export function strictComponent<P>(predicate: (props: P) => boolean, onFail: (props: P) => void) {
  return (Component: React.ComponentType<P>) => {
    class Wrapper extends React.Component<P, StrictComponentState> {
      state: StrictComponentState = { checked: false };
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
    // @ts-ignore
    Wrapper.WrappedComponent = Component;
    // @ts-ignore
    Wrapper.displayName = `strictComponent(${componentName})`;
    return hoistStatics(Wrapper, Component);
  };
}
