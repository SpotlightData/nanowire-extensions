import React from 'react';
import { ScrollList } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';

describe('components/form/ScrollList', () => {
  it('should display all items', () => {
    const props = {
      items: { key1: { text: 't1' }, key2: { text: 't2' } },
      accessor: a => a.text,
      height: 200,
      isActive: a => false,
      onClick: () => false,
    };
    const { debug, queryByText } = render(<ScrollList {...props} />);
    expect(queryByText('t1')).not.toBeNull();
    expect(queryByText('t2')).not.toBeNull();
  });

  it('should check if items are active', () => {
    const isActive = jest.fn();
    const props = {
      items: { key1: { text: 't1' }, key2: { text: 't2' } },
      accessor: a => a.text,
      height: 200,
      isActive,
      onClick: () => false,
    };
    const { debug, queryByText } = render(<ScrollList {...props} />);
    expect(isActive.mock.calls.length).toBe(2);
    expect(isActive.mock.calls[0][0]).toBe('key1');
    expect(isActive.mock.calls[1][0]).toBe('key2');
  });

  it('should notify if item is pressed', () => {
    const onClick = jest.fn();
    const props = {
      items: { key1: { text: 't1' }, key2: { text: 't2' } },
      accessor: a => a.text,
      height: 200,
      isActive: () => false,
      onClick,
    };
    const { debug, container, queryByText } = render(<ScrollList {...props} />);
    fireEvent(queryByText('t1'), new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(onClick.mock.calls.length).toBe(1);
    expect(onClick.mock.calls[0]).toEqual(['key1', props.items.key1]);
  });
});
