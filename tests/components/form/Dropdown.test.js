import React from 'react';
import { Dropdown } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';

const options = {
  test1: { key: 'test1', text: 'text1', disabled: false, value: 'value1' },
  test2: { key: 'test2', text: 'text2', disabled: false, value: 'value2' },
};

describe('components/form/Dropdown', () => {
  it('should notify with default value on mount', () => {
    const onChange = jest.fn();
    const props = {
      input: { value: '', onChange },
      label: 'Test label',
      defaultOption: options.test1,
      meta: {},
      options,
    };
    render(<Dropdown {...props} />);
    expect(onChange).toHaveBeenCalledWith(options.test1.key);
  });

  it('should display label if no default option given', () => {
    const onChange = jest.fn();
    const props = {
      input: { value: '', onChange },
      label: 'Test label',
      meta: {},
      options,
    };
    const { queryByText } = render(<Dropdown {...props} />);
    expect(queryByText('Test label')).not.toBeNull();
  });
  // TODO investigate why click a label does not fire of the selection
  // it('should display option text once selected', () => {
  //   const onChange = jest.fn();
  //   const props = {
  //     input: { value: '', onChange },
  //     label: 'Test label',
  //     meta: {},
  //     options,
  //   };
  //   const { container, debug } = render(<Dropdown {...props} />);
  //   fireEvent(
  //     container.querySelector('.ant-btn'),
  //     new MouseEvent('click', { bubbles: true, cancelable: true })
  //   );
  //   fireEvent(
  //     document.querySelector('.ant-dropdown-menu-item'),
  //     new MouseEvent('click', {
  //       bubbles: true,
  //       cancelable: true,
  //     })
  //   );
  //   debug();
  // });
});
