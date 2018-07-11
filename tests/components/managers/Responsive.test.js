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
});
