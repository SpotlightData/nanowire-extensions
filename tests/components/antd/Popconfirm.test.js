import React from 'react';
import { Popconfirm } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';

describe('components/antd/Popconfirm', () => {
  it('should show the default text', () => {
    const { container, debug, getByText } = render(
      <Popconfirm>
        <p>test</p>
      </Popconfirm>
    );
    fireEvent(getByText('test'), new MouseEvent('click', { bubbles: true, cancelable: true })); // click events must bubble for React to see it
    expect(getByText('Are you sure you want to delete this?')).not.toBeNull();
  });
});
