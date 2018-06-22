import React from 'react';
import { SidebarToggle } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';

describe('components/ui/SidebarToggle', () => {
  it('should call onClick handler', () => {
    const onClick = jest.fn();
    const { container, debug } = render(<SidebarToggle open onClick={onClick} />);
    fireEvent.click(container.firstChild, {});
    expect(onClick.mock.calls.length).toBe(1);
  });
});
