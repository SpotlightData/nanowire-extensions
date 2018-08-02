import React from 'react';
import { DragDropUploader, UppyProvider } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';
import Uppy from 'uppy/lib/core';
import waitForExpect from 'wait-for-expect';
import { makeMockFile } from '../utils';

describe('uppy/DragDrop', () => {
  it('should provide a drop area', () => {
    const uppy = Uppy({ autoProceed: false });
    const { queryByText } = render(
      <UppyProvider uppy={uppy}>
        <DragDropUploader onFail={() => false} />
      </UppyProvider>
    );
    expect(queryByText('Drop files here or')).not.toBeNull();
  });

  it('should register itself to uppy plugin list on mount', async () => {
    const uppy = Uppy({ autoProceed: false });
    render(
      <UppyProvider uppy={uppy}>
        <DragDropUploader onFail={() => false} />
      </UppyProvider>
    );
    await waitForExpect(() => {
      expect(uppy.plugins.acquirer[0].id).toBe('DragDrop');
    });
  });

  it('should remove itself to uppy plugin list on unmount', async () => {
    const uppy = Uppy({ autoProceed: false });
    const { unmount } = render(
      <UppyProvider uppy={uppy}>
        <DragDropUploader onFail={() => false} />
      </UppyProvider>
    );
    unmount();
    await waitForExpect(() => {
      expect(uppy.plugins.acquirer.length).toBe(0);
    });
  });

  it('should allow to add files via uploader', async () => {
    const uppy = Uppy({ autoProceed: false });
    const { unmount } = render(
      <UppyProvider uppy={uppy}>
        <DragDropUploader onFail={() => false} />
      </UppyProvider>
    );
    uppy.plugins.acquirer[0].handleDrop([makeMockFile()]);
    await waitForExpect(() => {
      expect(uppy.getFiles().length).toBe(1);
    });
  });
});
