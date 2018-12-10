import React from 'react';
import ReactDom from 'react-dom';
import { ResponsiveConsumer, ResponsiveProvider } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';

const makeContainer = (spec = {}) => ({
  addEventListener: () => false,
  removeEventListener: () => false,
  innerHeight: 1,
  innerWidth: 1,
  ...spec,
});

describe('components/managers/Responsive', () => {
  it('should allow to specify the container', () => {
    expect(() => {
      const container = makeContainer();
      render(
        <ResponsiveProvider container={container}>
          <div />
        </ResponsiveProvider>
      );
    }).not.toThrow();
  });
  it('should setup and remove listeners', () => {
    const container = makeContainer();
    container.addEventListener = jest.fn();
    container.removeEventListener = jest.fn();
    const { unmount } = render(
      <ResponsiveProvider container={container}>
        <div />
      </ResponsiveProvider>
    );
    expect(container.addEventListener.mock.calls.length).toBe(1);
    unmount();
    expect(container.removeEventListener.mock.calls.length).toBe(1);
  });
  it('should inject queries when consumer is used', () => {
    const container = makeContainer();
    container.innerWidth = 600;
    container.innerHeight = 600;
    const make = jest.fn();
    make.mockReturnValue(null);

    render(
      <ResponsiveProvider container={container}>
        <div>
          <ResponsiveConsumer>{make}</ResponsiveConsumer>
        </div>
      </ResponsiveProvider>
    );
    expect(make.mock.calls[0][0]).toEqual({
      height: 600,
      lg: false,
      md: false,
      sm: true,
      width: 600,
      xl: false,
      xll: false,
      xs: false,
    });
  });
  it('should re-render when container resizes', done => {
    expect.assertions(2);
    let count = 0;
    let container = makeContainer({
      addEventListener: (name, fn) => {
        container.innerHeight = 200;
        container.innerWidth = 200;
        setTimeout(fn, 0);
      },
      innerHeight: 600,
      innerWidth: 600,
    });

    render(
      <ResponsiveProvider getContainer={() => container} throttle={0} renderOnMount={false}>
        <ResponsiveConsumer>
          {spec => {
            if (count === 0) {
              expect(spec).toEqual({
                height: 600,
                lg: false,
                md: false,
                sm: true,
                width: 600,
                xl: false,
                xll: false,
                xs: false,
              });
            } else {
              expect(spec).toEqual({
                height: 200,
                lg: false,
                md: false,
                sm: false,
                width: 200,
                xl: false,
                xll: false,
                xs: true,
              });
              done();
            }
            count += 1;
            return null;
          }}
        </ResponsiveConsumer>
      </ResponsiveProvider>
    );
  });

  it('should call render function if it is supplied', () => {
    const container = makeContainer();
    const make = jest.fn();
    make.mockReturnValue(null);

    render(
      <ResponsiveProvider container={container}>
        <div>
          <ResponsiveConsumer render={make} />
        </div>
      </ResponsiveProvider>
    );

    expect(make.mock.calls.length).toBe(1);
  });

  it('should call children function if it is supplied', () => {
    const container = makeContainer();
    const make = jest.fn();
    make.mockReturnValue(null);

    render(
      <ResponsiveProvider container={container}>
        <div>
          <ResponsiveConsumer>{make}</ResponsiveConsumer>
        </div>
      </ResponsiveProvider>
    );

    expect(make.mock.calls.length).toBe(1);
  });

  it('should be able to handle component as child', () => {
    const container = makeContainer();
    const make = jest.fn();
    make.mockReturnValue(null);

    class MockChild extends React.Component {
      render = make;
    }

    render(
      <ResponsiveProvider container={container}>
        <div>
          <ResponsiveConsumer>
            <MockChild />
          </ResponsiveConsumer>
        </div>
      </ResponsiveProvider>
    );

    expect(make.mock.calls.length).toBe(1);
  });

  it('should not be render blocking', done => {
    const container = makeContainer();
    const make = jest.fn();
    make.mockReturnValue(null);

    class MockComponent extends React.PureComponent {
      state = { toggle: true };

      componentDidMount() {
        setTimeout(() => {
          this.setState({ toggle: false }, () => {
            expect(make.mock.calls.length).toBe(2);
            done();
          });
        });
      }

      render() {
        return (
          <ResponsiveProvider container={container}>
            <div>
              <ResponsiveConsumer>{make}</ResponsiveConsumer>
            </div>
          </ResponsiveProvider>
        );
      }
    }

    render(<MockComponent />);
  });
});
