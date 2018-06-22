import React from 'react';
import { UppyProvider, withUppy } from '@spotlightdata/nanowire-extensions';
import { render } from 'react-testing-library';

describe('uppy/withUppy', () => {
  it('should inject uppy into components', done => {
    const uppyMock = { test: true };
    const Component = props => {
      expect(props.uppy).toEqual(uppyMock);
      done();
      return null;
    };
    const Wrapper = withUppy(Component);

    const { container, debug } = render(
      <UppyProvider uppy={uppyMock}>
        <Wrapper />
      </UppyProvider>
    );
  });

  it('should not swallow props', done => {
    const uppyMock = { test: true };
    const props = { test1: false, test2: true, test3: false };
    const Component = ({ uppy, ...rest }) => {
      expect(rest).toEqual(props);
      done();
      return null;
    };
    const Wrapper = withUppy(Component);

    const { container, debug } = render(
      <UppyProvider uppy={uppyMock}>
        <Wrapper {...props} />
      </UppyProvider>
    );
  });
});
