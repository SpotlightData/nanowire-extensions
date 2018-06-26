import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import sid from 'shortid';

import { withUppy } from '../withUppy';
import { Uploader } from './Uploader';

import allowedExtensions from './allowedExtensions';

class DragDropBare extends PureComponent {
  constructor(props) {
    super(props);
    this.id = sid.generate();
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

DragDropBare.propTypes = {
  uppy: PropTypes.shape({
    removePlugin: PropTypes.func,
    getPlugin: PropTypes.func,
    use: PropTypes.func,
  }).isRequired,
  className: PropTypes.string,
  onFail: PropTypes.func.isRequired,
  options: PropTypes.shape({}),
};

DragDropBare.defaultProps = {
  className: '',
  options: {
    allowedExtensions,
  },
};

export const DragDropUploader = withUppy(DragDropBare);
