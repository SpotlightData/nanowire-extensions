import React, { PureComponent } from 'react';
import { CollapsiblePanel } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';

describe('components/antd/CollapsiblePanel', () => {
  it('should render header', () => {
    const { queryByText } = render(
      <CollapsiblePanel collapsed onClick={() => false} header="Hello world">
        Hello
      </CollapsiblePanel>
    );
    expect(queryByText('Hello world')).toBeDefined();
  });
  it('should render content when not collapsed', () => {
    const { queryByText } = render(
      <CollapsiblePanel collapsed onClick={() => false}>
        Hello world
      </CollapsiblePanel>
    );
    expect(queryByText('Hello world')).toBeDefined();
  });
  it('should call onClick prop when dropdown icon is pressed', () => {
    const fn = jest.fn();
    const { queryByText } = render(
      <CollapsiblePanel collapsed onClick={fn} header="Header">
        Hello world
      </CollapsiblePanel>
    );
    const button = queryByText('Header').parentNode.firstChild;
    fireEvent.click(button);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(false);
  });
  it('should not make children unmount when closed by default', () => {
    const onUnmount = jest.fn();
    class Child extends PureComponent {
      componentWillUnmount() {
        onUnmount();
      }
      render() {
        return null;
      }
    }
    class Container extends PureComponent {
      state = { collapsed: false };
      render() {
        return (
          <CollapsiblePanel
            collapsed={this.state.collapsed}
            onClick={collapsed => {
              this.setState({ collapsed });
            }}
            header="Header"
          >
            <Child />
          </CollapsiblePanel>
        );
      }
    }
    const { queryByText, unmount } = render(<Container />);
    const button = queryByText('Header').parentNode.firstChild;
    fireEvent.click(button);
    expect(onUnmount.mock.calls.length).toBe(0);
    unmount();
    expect(onUnmount.mock.calls.length).toBe(1);
  });
});
