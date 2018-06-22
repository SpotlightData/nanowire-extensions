import React from 'react';
import { UppyProvider, OneDrive } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';
import Uppy from 'uppy/lib/core';
import waitForExpect from 'wait-for-expect';

const uploaderResp = [
  null,
  {
    value: [
      {
        name: 'test-file',
        lastModifiedDateTime: new Date().toString(),
        file: { mimeType: 'pdf' },
      },
    ],
  },
];

describe('uppy/OneDrive', () => {
  it('should provide a labeled button', () => {
    const uppy = Uppy({ autoProceed: false });
    const { queryByText } = render(
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
    render(
      <UppyProvider uppy={uppy}>
        <OneDrive text="testText" appId="fakeId" />
      </UppyProvider>
    );
    expect(uppy.plugins.acquirer[0].id).toBe('OneDriveUpload');
  });

  it('should pass upload specifications to uploader function', async done => {
    const uppy = Uppy({
      autoProceed: false,
    });
    const spec = { test1: 'test1', test2: 'test2' };
    const options = {
      upload: {
        uploader: async settings => {
          expect(settings).toEqual(expect.objectContaining(spec));
          done();
          return uploaderResp;
        },
        spec,
      },
    };
    const { queryByText } = render(
      <UppyProvider uppy={uppy}>
        <OneDrive text="testText" appId="fakeId" options={options} />
      </UppyProvider>
    );
    fireEvent.click(queryByText('testText'), {});
  });

  it('should store all uploaded meta to uppy store', async () => {
    const uppy = Uppy({
      autoProceed: false,
    });
    const spec = { test1: 'test1', test2: 'test2' };
    const options = {
      upload: {
        uploader: async settings => {
          return uploaderResp;
        },
        spec,
      },
    };
    const { queryByText } = render(
      <UppyProvider uppy={uppy}>
        <OneDrive text="testText" appId="fakeId" options={options} />
      </UppyProvider>
    );
    fireEvent.click(queryByText('testText'), {});

    await waitForExpect(() => {
      expect(uppy.getFiles()[0]).toEqual(
        expect.objectContaining({ name: 'test-file', meta: { name: 'test-file', type: 'pdf' } })
      );
    });
  });
});
