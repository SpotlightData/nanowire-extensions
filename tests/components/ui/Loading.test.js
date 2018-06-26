import React from 'react';
import { Loading } from '@spotlightdata/nanowire-extensions';
import { render } from 'react-testing-library';

describe('components/ui/Loading', () => {
  it('provide default className', () => {
    const { container, debug } = render(<Loading />);
    expect(container.querySelector('.loading-spinner')).not.toBeNull();
  });
});
