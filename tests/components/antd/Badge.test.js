import React from 'react';
import { Badge } from '@spotlightdata/nanowire-extensions';
import { render } from 'react-testing-library';

describe('components/antd/Badge', () => {
  it('should show counts over 99 by number', () => {
    const { getByText, debug, container } = render(<Badge count={100} />);
    const elements = Array.from(container.getElementsByClassName('current'));
    expect(elements.map(t => t.textContent).join('')).toBe('100');
  });
});
