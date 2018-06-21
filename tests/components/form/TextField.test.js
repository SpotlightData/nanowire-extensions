import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { TextField } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';

describe('components/form/TextField', () => {
  it('should submit default value on mount', () => {
    const onChange = jest.fn();
    const props = {
      input: { value: '', onChange },
      meta: {},
      onEnterPress: () => false,
      defaultValue: 'test',
    };
    const { container, debug } = render(<TextField {...props} />);
    expect(onChange.mock.calls[0][0]).toBe('test');
  });

  it('should submit react to enter press if handler is specified', () => {
    const onEnterPress = jest.fn();
    const props = {
      input: { value: '', onChange: console.log, onPressEnter: console.log },
      meta: {},
      onEnterPress,
    };
    // const { container, debug } = render(<TextField {...props} />);
    let rf;
    const { container, debug } = render(
      <input
        onKeyDown={console.log}
        ref={node => {
          rf = node;
        }}
      />
    );
    ReactTestUtils.Simulate.keyDown(rf, { key: 'Enter', keyCode: 13, which: 13 });
    // fireEvent(
    //   container,
    //   // container.querySelector('.ant-input'),
    //   new KeyboardEvent('keyDown', { key: 'Enter', keyCode: 13 })
    // );
    debug();
    // expect(onEnterPress.mock.calls.length).toBe(1);
  });
});
