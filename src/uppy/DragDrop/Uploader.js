import DragDrop from 'uppy/lib/plugins/DragDrop';

export class Uploader extends DragDrop {
  registerFiles(files) {
    const upload = files.map(file => {
      const temp = file.name.split('.');
      const ext = temp[temp.length - 1].toLowerCase();
      if (!this.opts.allowedExtensions.includes(ext)) {
        return {
          name: file.name,
          type: file.type,
          e: 'File type not allowed',
        };
      }
      try {
        this.uppy.addFile({
          source: 'Local',
          name: file.name,
          type: file.type,
          data: file,
        });
        return undefined;
      } catch (e) {
        return { name: file.name, type: file.type, e: e.message };
      }
    });
    // If error is not cought, it returns nothing, so it can be filtered out
    const failed = upload.filter(p => p);
    if (failed.length !== 0 && this.opts.onFail) {
      this.opts.onFail(failed);
    }
    this.uppy.emit('file-batch');
  }

  handleDrop(files) {
    this.uppy.log('[DragDrop] Files dropped');
    this.registerFiles(files);
  }

  handleInputChange(ev) {
    this.uppy.log('[DragDrop] Files selected through input');

    const files = Array.from(ev.target.files);
    this.registerFiles(files);
  }
}
