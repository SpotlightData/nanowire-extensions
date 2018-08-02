import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import sid from 'shortid';

import { withUppy } from '../withUppy';
import { Uploader } from './Uploader';

import defaultAllowedExtensions from './allowedExtensions';

class DragDropUploaderBare extends PureComponent {
  constructor(props) {
    super(props);
    this.id = 'DragDropUploader_' + sid.generate();
  }

  componentDidMount() {
    const { uppy, options } = this.props;

    const settings = Object.assign(
      { target: `#${this.id}`, onFail: this.props.onFail, getMetaFromForm: true, note: '' },
      options
    );
    uppy.use(Uploader, settings);
  }

  componentWillUnmount() {
    const plugin = this.getPlugin();
    if (plugin) {
      this.props.uppy.removePlugin(plugin);
    }
  }

  getPlugin() {
    return this.props.uppy.getPlugin('DragDrop');
  }

  render() {
    return <div id={this.id} className={this.props.className} />;
  }
}

DragDropUploaderBare.propTypes = {
  uppy: PropTypes.shape({
    removePlugin: PropTypes.func,
    getPlugin: PropTypes.func,
    use: PropTypes.func,
  }).isRequired,
  className: PropTypes.string,
  onFail: PropTypes.func.isRequired,
  options: PropTypes.shape({
    allowedExtensions: PropTypes.arrayOf(PropTypes.string),
  }),
};

DragDropUploaderBare.defaultProps = {
  className: '',
  options: {
    allowedExtensions: defaultAllowedExtensions,
  },
};

export const DragDropUploader = withUppy(DragDropUploaderBare);
