import React from 'react';
import { UppyFileTable, UppyProvider } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';
import Uppy from 'uppy/lib/core';
import waitForExpect from 'wait-for-expect';
import { makeMockFile } from '../utils';

const mockFile = { source: 'Local', name: 'test-name', type: 'pdf', data: {}, size: 20000 };

describe('uppy/FileTable', () => {
  it('should provide a render function for footer', done => {
    const uppy = Uppy({ autoProceed: false });
    const footerRender = files => {
      expect(files).toEqual([]);
      done();
    };
    const { queryByText } = render(
      <UppyProvider uppy={uppy}>
        <UppyFileTable footerRender={footerRender} />
      </UppyProvider>
    );
  });

  it('should render added uppy files', async () => {
    const uppy = Uppy({ autoProceed: false });
    const footerRender = () => null;
    const { queryByText } = render(
      <UppyProvider uppy={uppy}>
        <UppyFileTable footerRender={footerRender} />
      </UppyProvider>
    );
    uppy.addFile(mockFile);
    uppy.emit('file-batch');
    await waitForExpect(() => {
      expect(queryByText('test-name')).not.toBeNull();
    });
  });

  it('should pass file removal function to column creation', async () => {
    const uppy = Uppy({ autoProceed: false });
    uppy.addFile(mockFile);
    let finished = false;

    const createColumns = deleteHandler => [
      {
        title: '',
        dataIndex: 'id',
        className: 'open-link',
        render: id => <button onClick={deleteHandler(id)}>Remove</button>,
      },
    ];
    const { queryByText, debug } = render(
      <UppyProvider uppy={uppy}>
        <UppyFileTable footerRender={() => null} createColumns={createColumns} />
      </UppyProvider>
    );
    fireEvent.click(queryByText('Remove'));
    await waitForExpect(() => {
      expect(uppy.getFiles().length).toBe(0);
    });
  });

  it('should provide a render function for the header', () => {
    expect.assertions(2);
    const uppy = Uppy({ autoProceed: false });
    uppy.addFile(mockFile);
    const headerRender = ({ files }) => {
      expect(files.length).toEqual(1);
      return <h2>My Header</h2>;
    };
    const { queryByText } = render(
      <UppyProvider uppy={uppy}>
        <UppyFileTable footerRender={() => null} headerRender={headerRender} />
      </UppyProvider>
    );
    expect(queryByText('My Header')).toBeInTheDocument();
  });
  it('should allow to remove all files in the table', async () => {
    expect.assertions(2);
    const uppy = Uppy({ autoProceed: false });

    uppy.addFile(makeMockFile());
    uppy.addFile(makeMockFile());
    uppy.addFile(makeMockFile());

    const headerRender = ({ files, removeAllFiles }) => {
      return <button onClick={removeAllFiles}>RemoveAll</button>;
    };
    const { queryByText } = render(
      <UppyProvider uppy={uppy}>
        <UppyFileTable footerRender={() => null} headerRender={headerRender} />
      </UppyProvider>
    );
    expect(uppy.getFiles().length).toBe(3);
    fireEvent.click(queryByText('RemoveAll'));
    await waitForExpect(() => {
      expect(uppy.getFiles().length).toBe(0);
    });
  });
});
