import React from 'react';
import { UppyFileTable, UppyProvider } from '@spotlightdata/nanowire-extensions';
import { render, fireEvent } from 'react-testing-library';
import Uppy from 'uppy/lib/core';
import waitForExpect from 'wait-for-expect';

describe('uppy/FileTable', () => {
  it('should provide a render function for submit button', done => {
    const uppy = Uppy({ autoProceed: false });
    const sumbitRender = files => {
      expect(files).toEqual([]);
      done();
    };
    const { queryByText } = render(
      <UppyProvider uppy={uppy}>
        <UppyFileTable sumbitRender={sumbitRender} />
      </UppyProvider>
    );
  });

  it('should render added uppy files', async () => {
    const uppy = Uppy({ autoProceed: false });
    const sumbitRender = () => null;
    const { queryByText } = render(
      <UppyProvider uppy={uppy}>
        <UppyFileTable sumbitRender={sumbitRender} />
      </UppyProvider>
    );
    uppy.addFile({
      source: 'Local',
      name: 'test-name',
      type: 'pdf',
      data: {},
      size: 20000,
    });
    uppy.emit('file-batch');
    await waitForExpect(() => {
      expect(queryByText('test-name')).not.toBeNull();
    });
  });

  it('should pass file removal function to column creation', async () => {
    const uppy = Uppy({ autoProceed: false });
    uppy.addFile({ source: 'Local', name: 'test-name', type: 'pdf', data: {}, size: 20000 });
    let finished = false;

    const createColumns = deleteHandler => [
      {
        title: '',
        dataIndex: 'id',
        className: 'open-link',
        render: id => <button onClick={deleteHandler(id)}>Remove</button>,
      },
    ];
    const { queryByText } = render(
      <UppyProvider uppy={uppy}>
        <UppyFileTable sumbitRender={() => null} createColumns={createColumns} />
      </UppyProvider>
    );
    fireEvent.click(queryByText('Remove'));
    await waitForExpect(() => {
      expect(uppy.getFiles().length).toBe(0);
    });
  });
  // it('should register itself to uppy plugin list on mount', async () => {
  //   const uppy = Uppy({ autoProceed: false });
  //   render(
  //     <UppyProvider uppy={uppy}>
  //       <DragDropUploader onFail={() => false} />
  //     </UppyProvider>
  //   );
  //   await waitForExpect(() => {
  //     expect(uppy.plugins.acquirer[0].id).toBe('DragDrop');
  //   });
  // });

  // it('should remove itself to uppy plugin list on unmount', async () => {
  //   const uppy = Uppy({ autoProceed: false });
  //   const { unmount } = render(
  //     <UppyProvider uppy={uppy}>
  //       <DragDropUploader onFail={() => false} />
  //     </UppyProvider>
  //   );
  //   unmount();
  //   await waitForExpect(() => {
  //     expect(uppy.plugins.acquirer.length).toBe(0);
  //   });
  // });
});
