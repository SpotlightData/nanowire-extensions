import React from 'react';
import { UppyProvider, OneDrive } from '@spotlightdata/nanowire-extensions';
import { render } from 'react-testing-library';
import Uppy from 'uppy/lib/core';
import waitForExpect from 'wait-for-expect';

describe('uppy/OneDrive', () => {
  it('should provide a labeled button', () => {
    const uppy = Uppy({ autoProceed: false });
    const { debug, container, queryByText } = render(
      <UppyProvider uppy={uppy}>
        <OneDrive text="testText" appId="fakeId" />
      </UppyProvider>
    );
    expect(queryByText('testText')).not.toBeNull();
  });

  it('should register to uppy plugin list', () => {
    const uppy = Uppy({
      autoProceed: false,
    });
    const { debug, container, queryByText } = render(
      <UppyProvider uppy={uppy}>
        <OneDrive text="testText" appId="fakeId" />
      </UppyProvider>
    );
    expect(uppy.plugins.acquirer[0].id).toBe('OneDriveUpload');
  });

  it('should remove itself from uppy plugin list when unmounted', async () => {
    const uppy = Uppy({
      autoProceed: false,
    });
    const { unmount } = render(
      <UppyProvider uppy={uppy}>
        <OneDrive text="testText" appId="fakeId" />
      </UppyProvider>
    );
    unmount();
    await waitForExpect(() => {
      expect(uppy.plugins.acquirer.length).toBe(0);
    });
  });
});
