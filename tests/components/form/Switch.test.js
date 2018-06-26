import React from 'react';
import { Switch } from '@spotlightdata/nanowire-extensions';
import { render } from 'react-testing-library';

describe('components/form/Switch', () => {
  it('should notify with default value on mount', () => {
    const onChange = jest.fn();
    const props = { input: { value: 'true', onChange }, meta: {} };
    render(<Switch {...props} />);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
