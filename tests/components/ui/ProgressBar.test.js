import React from 'react';
import { ProgressBar } from '@spotlightdata/nanowire-extensions';
import { render } from 'react-testing-library';

describe('components/ui/ProgressBar', () => {
  it('should show sucess at 100%', () => {
    const props = {
      progress: {
        total: 100,
        left: 0,
        failed: 0,
      },
    };
    const { container, debug } = render(<ProgressBar {...props} />);
    expect(container.querySelector('.ant-progress-status-success')).not.toBeNull();
  });
});
