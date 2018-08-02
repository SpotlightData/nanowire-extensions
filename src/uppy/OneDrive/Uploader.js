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

export const getPluginId = settings => {
  return settings.id || 'OneDriveUploader';
};

export class Uploader extends Plugin {
  constructor(uppy, opts) {
    super(uppy, opts);
    this.type = 'acquirer';
    this.id = getPluginId(opts);
    this.title = 'Onedrive upload';
    this.opts = opts;
    // Uploader
    this.settings = opts.upload || { uploader: getFiles, spec: {} };
  }

  uploadFiles(files) {
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
    Promise.all(upload).then(() => this.uppy.emit('file-batch'));
  }

  handleUploadReq = async e => {
    e.preventDefault();
    const settings = {
      clientId: this.opts.appId,
      action: 'query',
      multiSelect: true,
      openInNewWindow: true,
      source:
        process.env.NODE_ENV === 'development'
          ? `http://localhost:${process.env.PORT}/services/onedrive`
          : '/services/onedrive',
      advanced: { queryParameters: `select=${includeKeys.join(',')}` },
      ...this.settings.spec,
    };
    const [error, resp] = await this.settings.uploader(settings);
    if (error) {
      notification.open({
        message: 'Failed one drive upload',
        description: JSON.stringify(error),
      });
    } else if (resp) {
      this.uploadFiles(resp.value);
    }
  };
  // Because uppy uses preact, we manually create render function
  render = () =>
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
