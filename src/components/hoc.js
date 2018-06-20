import React, { PureComponent } from 'react';
import hoistStatics from 'hoist-non-react-statics';

/**
 * A higher order function to allow for strict checks before render
 * Example usage is:
 *  Checking if user has been authenticated
 *  Checking if user is an admin
 * @example
 * import { strictComponent } from '@spotlightdata/nanowire-extensions';
 *
 * const MyComponent = strictComponent(props => props.isAdmin, props => console.log('Failed'))(BaseComponent);
 * render(<Comp />);
 * @param {(props) => boolean} predicate
 * @param {(props) => void} onFail
 * @return {ReactComponent => ReactComponent}
 */
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
