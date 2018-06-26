import React from 'react';
import { TextArea } from '@spotlightdata/nanowire-extensions';
import { render } from 'react-testing-library';

describe('components/form/TextArea', () => {
  it('should render placeholder', () => {
    const props = {
      rows: 2,
      placeholder: 'test',
      input: {
        value: '',
        onChange: console.log,
      },
      meta: {},
    };
    const { container, debug } = render(<TextArea {...props} />);
    expect(container.querySelector('.ant-input').placeholder).toBe('test');
  });
});
