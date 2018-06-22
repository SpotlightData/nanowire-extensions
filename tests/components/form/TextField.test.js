import React from 'react';
import { TextField } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';

describe('components/form/TextField', () => {
  it('should submit default value on mount', () => {
    const onChange = jest.fn();
    const props = {
      input: { value: '', onChange },
      meta: {},
      defaultValue: 'test',
    };
    const { container, debug } = render(<TextField {...props} />);
    expect(onChange.mock.calls[0][0]).toBe('test');
  });

  it('should submit react to enter press if handler is specified', () => {
    const onPressEnter = jest.fn();
    const props = {
      input: { value: '', onChange: console.log, onPressEnter },
      meta: {},
    };
    const { container, debug } = render(<TextField {...props} />);
    fireEvent.keyDown(container.querySelector('.ant-input'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });
    expect(onPressEnter.mock.calls.length).toBe(1);
  });
});
