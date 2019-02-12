import React from 'react';
import { SimpleProgressBar } from '@spotlightdata/nanowire-extensions';
import { render } from 'react-testing-library';

const classes = {
  container: 'container',
  text: 'text',
};

describe('components/ui/ProgressBar', () => {
  it('should render', () => {
    const { container, debug } = render(
      <SimpleProgressBar classes={classes} format={a => a} percent={20} />
    );
    expect(container.querySelector(`.${classes.container}`)).not.toBeNull();
  });
});
