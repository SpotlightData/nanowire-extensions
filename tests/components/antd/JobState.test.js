import React from 'react';
import { JobState } from '@spotlightdata/nanowire-extensions';
import { render } from 'react-testing-library';

describe('components/antd/JobState', () => {
  it('should highlight correct step', () => {
    const steps = ['step1', 'step2', 'step3'];

    const { container, debug } = render(<JobState current={1} steps={steps} />);
    const active = container
      .querySelector('.ant-steps-item-process')
      .querySelector('.ant-steps-item-title').textContent;
    expect(steps[1]).toBe(active);
  });
});
