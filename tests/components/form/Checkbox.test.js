import React from 'react';
import { Checkbox } from '@spotlightdata/nanowire-extensions';
import { render } from 'react-testing-library';

describe('components/form/Checkbox', () => {
  it('should notify with default value on mount', () => {
    const onChange = jest.fn();
    const props = { input: { checked: false, onChange }, label: 'Test label', defaultValue: true };
    render(<Checkbox {...props} />);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
