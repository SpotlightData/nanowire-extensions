import Plugin from 'uppy/lib/core/Plugin';
import { h } from 'preact';
import { notification } from 'antd';

import { getFiles } from './getFiles';

const includeKeys = [
  '@content.downloadUrl',
  '@microsoft.graph.downloadUrl',
  'id',
  'name',
  'webUrl',
  'size',
  'file',
  'folder',
  'photo',
  'image',
  'audio',
  'video',
  'location',
  'createdBy',
  'createdDateTime',
  'lastModifiedBy',
  'lastModifiedDateTime',
];

export class Uploader extends Plugin {
  constructor(uppy, opts) {
    super(uppy, opts);
    this.type = 'acquirer';
    this.id = this.opts.id || 'OneDriveUpload';
    this.title = 'Onedrive upload';
    this.opts = opts;
    this.getFiles = opts.getFiles || getFiles;
  }

  async uploadFiles(files) {
    const upload = files.map(file =>
      this.uppy.addFile({
        source: 'ONEDRIVE',
        name: file.name,
        type: file.file.mimeType,
        isRemote: true,
        data: Object.assign(
          {
            lastModified: file.lastModifiedDateTime,
          },
          file
        ),
      })
    );
    await Promise.all(upload);
    this.uppy.emit('file-batch');
  }

  handleUploadReq = async e => {
    e.preventDefault();
    const [error, resp] = await this.getFiles({
      clientId: this.opts.appId,
      action: 'query',
      multiSelect: true,
      openInNewWindow: true,
      advanced: {
        queryParameters: `select=${includeKeys.join(',')}`,
      },
    });
    if (error) {
      notification.open({
        message: 'Failed one drive upload',
        description: JSON.stringify(error),
      });
    } else if (resp) {
      this.uploadFiles(resp.value);
    }
  };
  // Because uppy uses preact
  render = state =>
    h(
      'div',
      { className: 'wrapper' },
      h(
        'button',
        { onClick: this.handleUploadReq, class: this.opts.buttonClass || '' },
        this.opts.text
      )
    );

  install() {
    const target = this.opts.target;
    this.mount(target, this);
  }

  uninstall() {
    this.unmount();
  }
}
