import React from 'react';
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
});
