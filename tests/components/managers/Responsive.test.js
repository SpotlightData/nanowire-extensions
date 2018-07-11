import React from 'react';
import { ResponsiveConsumer, ResponsiveProvider } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';

const makeContainer = () => ({
  addEventListener: () => false,
  removeEventListener: () => false,
  innerHeight: 1,
  innerWidth: 1,
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
  it('should re-render when container resizes', () => {
    const container = makeContainer();
    let callListener;
    container.addEventListener = (name, fn) => {
      callListener = fn;
    };
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
    container.innerWidth = 200;
    container.innerHeight = 200;
    callListener();

    expect(make.mock.calls.length).toBe(2);
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
    expect(make.mock.calls[1][0]).toEqual({
      height: 200,
      lg: false,
      md: false,
      sm: false,
      width: 200,
      xl: false,
      xll: false,
      xs: true,
    });
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
});
